import type { Media } from '#graphql/generated/anilist/types'
import Anime from '#models/anime'
import { AnilistNormalizerService } from '#services/anilist_normalizer_service'
import type { SearchQueryMediaArray, WatchStatus } from '#types/types'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

@inject()
export class AnimesService {
  constructor(protected readonly _anilistNormalizerService: AnilistNormalizerService) {}

  async getByIdByUser(id: number, userId: number) {
    const anime = await Anime.query()
      .debug(true)
      .where('id', id)
      .andWhereHas('users', (query) => {
        query.where('user_id', userId)
      })
      .preload('genres')
      .preload('users', (query) => {
        query.pivotColumns(['watch_status'])
      })
      .firstOrFail()
    return anime
  }

  /**
   * Get user's animes where `watch_status` is different from `completed`.
   *
   * @param userId User id attached to animes
   * @returns User's animes list to watch
   */
  async getAnimesToWatchByUser(userId: number) {
    const animes = await Anime.query()
      .debug(true)
      .andWhereHas('users', (queryUsers) => {
        queryUsers.where('user_id', userId).where('watch_status', '!=', 'completed')
      })

    return animes
  }

  /**
   * Remove anime from user's watchlist.
   *
   * @param animeId Anime ID
   * @param userId User ID
   */
  async removeFromWatchlist(animeId: number, userId: number) {
    db.transaction(async (trx) => {
      const anime = await Anime.findOrFail(animeId, { client: trx })
      await anime.related('users').detach([userId], trx)
    })
  }

  /**
   * Get user's Anilist anime ids.
   *
   * @param userId User id attached to animes
   * @returns User's Anilist anime ids list
   */
  async getAnimeAnilistIdsByUser(userId: number) {
    const animes = await Anime.query()
      .debug(true)
      .select('external_source_id')
      .andWhereHas('users', (queryUsers) => {
        queryUsers.where('user_id', userId)
      })

    return animes.map((anime) => +anime.externalSourceId!)
  }

  /**
   * Save Medias from GraphQL query result.
   *
   * @param searchQueryMediaArray GraphQL query result containing Medias
   * @param userId Current authentificated user id
   * @param setWatchStatusFn Callback to define WatchStatus before insert into database
   */
  async saveAnilistGqlMedia(
    searchQueryMediaArray: SearchQueryMediaArray,
    userId: number,
    setWatchStatusFn: (toSaveAnime: Anime) => WatchStatus
  ) {
    const normalizedData = await this._anilistNormalizerService.normalizeData(
      searchQueryMediaArray as Media[]
    )

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
            [userId]: {
              watch_status: setWatchStatusFn(anime),
            },
          })
        })
      )
    })
  }
}
