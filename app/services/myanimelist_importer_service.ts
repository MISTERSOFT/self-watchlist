import MyAnimeListImportFailedException from '#exceptions/my_anime_list_import_failed_exception'
import { AbtractImporterService } from '#services/abstract_importer_service'
import { AnilistNormalizerService } from '#services/anilist_normalizer_service'
import { AnilistService } from '#services/anilist_service'
import { AnimesService } from '#services/animes_service'
import type { SearchQueryMediaArray, WatchStatus } from '#types/types'
import { malUserAnimeListUrlSchema } from '#validators/myanimelist'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import vine from '@vinejs/vine'
import { difference } from 'es-toolkit'

// NOTE: MAL Status
// 1: Currently watching
// 2: Completed
// 3: On hold
// 4: Dropped
// 6: Plan to watch
const checkMalUserListResultSchema = vine.array(
  vine.object({
    anime_id: vine.number(),
    status: vine.number(),
  })
)

@inject()
export class MyAnimeListImporterService extends AbtractImporterService {
  constructor(
    protected readonly _ctx: HttpContext,
    protected readonly _anilistService: AnilistService,
    protected readonly _anilistNormalizerService: AnilistNormalizerService,
    protected readonly _animesService: AnimesService
  ) {
    super()
  }

  /**
   * Import a user anime list from MyAnimeList (MAL).
   *
   * @param username MAL username to import anime list from
   */
  async fromUsername(username: string): Promise<void> {
    const user = this._ctx.auth.getUserOrFail()

    // Check MAL url
    const url = await vine.validate({
      data: `https://myanimelist.net/animelist/${username}/load.json`,
      schema: malUserAnimeListUrlSchema,
    })

    const response = await fetch(url)
    if (!response.ok) {
      throw new MyAnimeListImportFailedException()
    }
    const json = await response.json()
    const data = await vine.validate({
      data: json,
      schema: checkMalUserListResultSchema,
    })

    const kvAnimeWatchStatus = new Map<number, WatchStatus>()
    data.forEach(({ anime_id, status }) => {
      kvAnimeWatchStatus.set(anime_id, this._getWatchStatus(status))
    })

    let hasNextPage = true
    let page = 1
    let anilistAnimes: SearchQueryMediaArray = []

    // Fetch all animes details from Anilist
    do {
      const animes = await this._anilistService.getByMalId({
        idMalIn: kvAnimeWatchStatus.keys().toArray(),
        page,
      })

      anilistAnimes = anilistAnimes.concat(animes.Page?.media!)

      hasNextPage = animes.Page?.pageInfo?.hasNextPage || false
      page += 1
    } while (hasNextPage)

    // Log unmatched MAL animes from Anilist API
    logger.info(
      `[${MyAnimeListImporterService.name}] MAL count: ${kvAnimeWatchStatus.size} | Anilist count: ${anilistAnimes.length}`
    )
    const malAnimeIds = kvAnimeWatchStatus.keys().toArray()
    let missingAnimes = difference(
      malAnimeIds,
      anilistAnimes.map((a) => a!.idMal!)
    )
    logger.debug(missingAnimes, `[${MyAnimeListImporterService.name}] Missing animes`)

    // Save in db
    await this._animesService.saveAnilistGqlMedia(
      anilistAnimes,
      user.id,
      (anime) => kvAnimeWatchStatus.get(+anime.myanimelistId!)!
    )
  }

  /**
   * Map MAL status to Watch status
   * @param status MAL status
   * @returns Watch status for the app
   */
  private _getWatchStatus(status: number): WatchStatus {
    switch (status) {
      case 1:
        return 'watching'
      case 2:
        return 'completed'
      case 3:
        return 'on_hold'
      case 4:
        return 'dropped'
      default:
        return 'plan_to_watch'
    }
  }
}
