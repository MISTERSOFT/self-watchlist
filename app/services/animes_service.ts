import stringHelpers from '#extensions/core/helpers/string_extension'
import Anime from '#models/anime'
import Genre from '#models/genre'
import { AnilistNormalizerService } from '#services/anilist_normalizer_service'
import { GenresService } from '#services/genres_service'
import { ModelProperties } from '#types/model'
import type { SearchQueryMediaArray, WatchStatus } from '#types/types'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

@inject()
export class AnimesService {
  constructor(
    protected readonly _genresService: GenresService,
    protected readonly _anilistNormalizerService: AnilistNormalizerService
  ) {}

  async getByIdByUser(id: number, userId: number) {
    const anime = await Anime.query()
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

  async getByIdAndByUser(id: string, userId: number) {
    const anime = await Anime.query()
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
   * @param filters Filter values to apply
   * @returns User's animes list to watch
   */
  async getAnimesByUser(userId: number, filters: { watchStatus: WatchStatus }) {
    const animes = await Anime.query().andWhereHas('users', (queryUsers) => {
      queryUsers.where('user_id', userId).where('watch_status', '=', filters.watchStatus)
    })

    return animes
  }

  /**
   * Get user's Anilist anime ids.
   *
   * @param userId User id attached to animes
   * @returns User's Anilist anime ids list
   */
  async getAnimeAnilistIdsByUser(userId: number) {
    const animes = await Anime.query()
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
    const genres = await Genre.all()

    const filtered = searchQueryMediaArray!.filter((media) => media?.idMal !== null)

    const normalized: Array<ModelProperties<Anime>> = await Promise.all(
      filtered.map(async (media) => ({
        externalSourceId: media!.id.toString(),
        externalSource: 'anilist',
        myanimelistId: media!.idMal!.toString(),
        title: media!.title?.romaji as string,
        alternativeTitles: this._anilistNormalizerService.normalizeTitles(media!),
        format: media!.format!.toLowerCase(),
        synopsis: stringHelpers.stripHtmlTags(media?.description!),
        // synopsis: await TranslatorService.translate(stringHelpers.stripHtmlTags(media?.description!)),
        score: this._anilistNormalizerService.normalizeScore(media!.meanScore!),
        status: this._anilistNormalizerService.normalizeStatus(media!.status!),
        season: this._anilistNormalizerService.normalizeSeason(media!.season!),
        seasonYear: media!.seasonYear!,
        thumbnailUrl: media!.coverImage?.extraLarge || null,
        backgroundUrl: media!.bannerImage || null,
        trailerSource: media!.trailer?.site || null,
        trailerId: media!.trailer?.id || null,
        episodesCount: media!.episodes || null,
        nsfw: media!.isAdult || false,
        releasedAt: DateTime.fromObject(
          {
            year: media!.startDate?.year!,
            month: media!.startDate?.month!,
            day: media!.startDate?.day!,
          },
          { zone: 'Europe/Paris' }
        ),
        genres: await this._genresService.matchAll(media!.genres as string[], genres),
      }))
    )

    // Save in db
    await db.transaction(async (trx) => {
      await Promise.all(
        normalized.map(async (animeProps) => {
          const anime = new Anime()
          anime.useTransaction(trx)

          anime.fill(animeProps, true)

          await anime.save()

          // Attach genres to anime
          await anime.related('genres').attach(animeProps.genres!.map((genre) => genre.id))
          // Attach current user to anime
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
