import MyAnimeListImportFailedException from '#exceptions/my_anime_list_import_failed_exception'
import type { Media } from '#graphql/generated/anilist/types'
import Anime from '#models/anime'
import { AbtractImporterService } from '#services/abstract_importer_service'
import { AnilistNormalizerService } from '#services/anilist_normalizer_service'
import { AnilistService } from '#services/anilist_service'
import { malUserAnimeListUrlSchema } from '#validators/myanimelist'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { difference } from 'es-toolkit'

type WatchStatus = 'plan_to_watch' | 'watching' | 'completed' | 'on_hold' | 'dropped'

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
    protected readonly _anilistService: AnilistService,
    protected readonly _anilistNormalizerService: AnilistNormalizerService,
    protected readonly _ctx: HttpContext
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
    let anilistAnimes: Media[] = []

    // Fetch all animes details from Anilist
    do {
      const animes = await this._anilistService.getByMalId({
        idMalIn: kvAnimeWatchStatus.keys().toArray(),
        page,
      })

      anilistAnimes = anilistAnimes.concat(animes.Page?.media as Media[])

      hasNextPage = animes.Page?.pageInfo?.hasNextPage || false
      page += 1
    } while (hasNextPage)

    logger.info(
      `[${MyAnimeListImporterService.name}] MAL count: ${kvAnimeWatchStatus.size} | Anilist count: ${anilistAnimes.length}`
    )
    const malAnimeIds = kvAnimeWatchStatus.keys().toArray()
    let missingAnimes = difference(
      malAnimeIds,
      anilistAnimes.map((a) => a.idMal!)
    )
    logger.debug(missingAnimes, `[${MyAnimeListImporterService.name}] Missing animes`)

    // Normalize all animes to fit the database
    const normalizedData = await this._anilistNormalizerService.normalizeData(anilistAnimes)

    // Save in db
    await db.transaction(async (trx) => {
      // NOTE: Genres come from the database
      await Promise.all(
        normalizedData.map(async ({ anime: animeProps, genres: animeGenres }) => {
          const anime = new Anime()
          anime.externalSourceId = animeProps.externalSourceId!
          anime.externalSource = animeProps.externalSource!
          anime.myanimelistId = animeProps.myanimelistId!
          // anime.slug = animeProps.slug!
          anime.title = animeProps.title!
          anime.alternativeTitles = animeProps.alternativeTitles!
          anime.type = animeProps.type!
          anime.synopsis = animeProps.synopsis!
          anime.score = animeProps.score!
          anime.status = animeProps.status!
          anime.season = animeProps.season!
          anime.seasonYear = animeProps.seasonYear!
          anime.thumbnailUrl = animeProps.thumbnailUrl!
          anime.backgroundUrl = animeProps.backgroundUrl!
          anime.trailerSource = animeProps.trailerSource!
          anime.trailerId = animeProps.trailerId!
          anime.episodesCount = animeProps.episodesCount!
          anime.nsfw = animeProps.nsfw!
          anime.releasedAt = animeProps.releasedAt!

          anime.useTransaction(trx)
          await anime.save()

          // Associate genres to anime
          await anime.related('genres').attach(animeGenres.map((genre) => genre.id))
          // Associate current user to anime
          await anime.related('users').attach({
            [user.id]: {
              watch_status: kvAnimeWatchStatus.get(+anime.myanimelistId),
            },
          })
        })
      )
    })
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
