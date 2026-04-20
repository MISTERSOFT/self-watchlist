import { Media } from '#graphql/generated/anilist/types'
import type Anime from '#models/anime'
import { AnilistNormalizerService } from '#services/anilist_normalizer_service'
import { AnilistService } from '#services/anilist_service'
import { AnimesService } from '#services/animes_service'
import { MoviesService } from '#services/movies_service'
import { TmdbSearchMovieNormalizerService } from '#services/tmdb_search_movie_normalizer_service'
import { TmdbSearchTvshowNormalizerService } from '#services/tmdb_search_tvshow_normalizer_service'
import { TMDBPagination, TMDBSearchTVShow, TmdbService } from '#services/tmdb_service'
import { TvShowsService } from '#services/tv_shows_service'
import {
  addNewMediaValidator,
  deleteUserMediaValidator,
  searchNewMediaValidator,
  updateUserMediaValidator,
} from '#validators/media'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { flow } from 'es-toolkit'

type SafeProperty<T> = { [P in keyof T]: NonNullable<T[P]> }
type SearchAnime = Pick<
  SafeProperty<Anime>,
  'externalSource' | 'externalSourceId' | 'title' | 'alternativeTitles' | 'thumbnailUrl' | 'nsfw'
> & {
  type: 'anime'
}
type SearchMovie = Pick<
  SafeProperty<Anime>,
  'externalSource' | 'externalSourceId' | 'title' | 'alternativeTitles' | 'thumbnailUrl' | 'nsfw'
> & {
  type: 'movie'
}
type SearchTVShow = Pick<
  SafeProperty<Anime>,
  'externalSource' | 'externalSourceId' | 'title' | 'alternativeTitles' | 'thumbnailUrl' | 'nsfw'
> & {
  type: 'tvshow'
}
type SearchMedia = SearchAnime | SearchMovie | SearchTVShow

const TMDB_GENRE_ANIMATION_ID = 16
const TMDB_ORIGIN_COUNTRY_JP = 'JP'
const filterTvshowsFn = flow(
  (_tvshows: TMDBPagination<TMDBSearchTVShow>['results'], _tmdbTvShowIdsInDb: number[]) =>
    _tvshows.filter((m) => !_tmdbTvShowIdsInDb.includes(m.id)),
  (_tvshows: TMDBPagination<TMDBSearchTVShow>['results']) =>
    _tvshows.filter(
      (m) =>
        m.genre_ids.length > 0 &&
        !m.genre_ids.includes(TMDB_GENRE_ANIMATION_ID) &&
        m.origin_country.includes(TMDB_ORIGIN_COUNTRY_JP)
    )
)

@inject()
export default class MediasController {
  constructor(
    protected readonly _anilistService: AnilistService,
    protected readonly _anilistNormalizerService: AnilistNormalizerService,
    protected readonly _animesService: AnimesService,
    protected readonly _tmdbService: TmdbService,
    protected readonly _tmdbSearchMovieNormalizerService: TmdbSearchMovieNormalizerService,
    protected readonly _moviesService: MoviesService,
    protected readonly _tmdbSearchTvshowNormalizerService: TmdbSearchTvshowNormalizerService,
    protected readonly _tvshowsService: TvShowsService
  ) {}

  async search({ request, auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { search, type } = await request.validateUsing(searchNewMediaValidator)

    switch (type) {
      case 'anime':
        const userAnilistAnimeIds = await this._animesService.getAnimeAnilistIdsByUser(user.id)
        const result = await this._anilistService.search({
          search,
          // Remove from the search query animes that are already associated to the user in database
          idNotIn: userAnilistAnimeIds,
        })

        const data = result.Page?.media?.map((media) => {
          const { externalSource, externalSourceId, title, alternativeTitles, thumbnailUrl, nsfw } =
            this._anilistNormalizerService.normalize(media as Media)
          return {
            externalSource,
            externalSourceId,
            title,
            alternativeTitles,
            thumbnailUrl,
            nsfw,
            type: 'anime',
          } as SearchAnime
        })

        return serialize({
          type,
          medias: data || [],
        })

      case 'movie':
        // 1. Get TMDB movies already in db
        const tmdbMovieIdsInDb = await this._moviesService.getMoviesTMDBIdsByUser(user.id)
        // 2. Search movies
        const movies = await this._tmdbService.searchMovie({ query: search })
        // 3. Searched movies - db movies
        const filteredMovies = movies
          ? movies.results.filter((m) => !tmdbMovieIdsInDb.includes(m.id))
          : []
        // 4. Normalize searched movies
        const normalizedMovies = await this._tmdbSearchMovieNormalizerService.normalizeData(
          filteredMovies!
        )
        // 5. Return
        return serialize({
          type,
          medias: normalizedMovies.map(
            (m) =>
              ({
                alternativeTitles: m.title,
                externalSource: m.externalSource,
                externalSourceId: m.externalSourceId,
                nsfw: m.nsfw,
                thumbnailUrl: m.thumbnailUrl,
                title: m.title,
                type: 'movie',
              }) as SearchMovie
          ),
        })

      case 'tvshow':
        // 1. Get TMDB TvShow already in db
        const tmdbTvShowIdsInDb = await this._tvshowsService.getTvShowsTMDBIdsByUser(user.id)
        // 2. Search TvShow
        const tvshows = await this._tmdbService.searchTVShow({ query: search })
        // 3. Filter tvshow to remove :
        // - those already in db
        // - those where the origin country is Japon and has an "Animation" (id: 16) genre. In other word, we remove Anime from the result.
        const filteredTvshows = tvshows ? filterTvshowsFn(tvshows.results, tmdbTvShowIdsInDb) : []
        // 4. Normalize searched TvShow
        const normalizedTvshows = await this._tmdbSearchTvshowNormalizerService.normalizeData(
          filteredTvshows!
        )
        // 5. Return
        return serialize({
          type,
          medias: normalizedTvshows.map(
            (m) =>
              ({
                alternativeTitles: m.title,
                externalSource: m.externalSource,
                externalSourceId: m.externalSourceId,
                nsfw: m.nsfw,
                thumbnailUrl: m.thumbnailUrl,
                title: m.title,
                type: 'tvshow',
              }) as SearchTVShow
          ),
        })

      default:
        return serialize({
          type,
          medias: new Array<SearchMedia>(),
        })
    }
  }

  async addToWatchlist({ request, auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { externalSourceId, type } = await request.validateUsing(addNewMediaValidator)

    let name = ''

    if (type === 'anime') {
      const queryResult = await this._anilistService.getByMediaId({ mediaId: externalSourceId })
      await this._animesService.saveAnilistGqlMedia(
        queryResult.Page?.media,
        user.id,
        () => 'plan_to_watch'
      )

      const media = queryResult.Page?.media![0]!
      name = media.title?.romaji! || media.title?.english! || media.title?.native!
    }

    return serialize({
      success: true,
      name,
    })
  }

  async removeFromWatchlist({ request, serialize, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { mediaId, type } = await request.validateUsing(deleteUserMediaValidator)

    switch (type) {
      case 'anime':
        await this._animesService.removeFromWatchlist(mediaId, user.id)
        break

      case 'movie':
        break

      case 'tvshow':
        break

      default:
        break
    }

    return serialize({ success: true })
  }

  async updateWatchStatus({ request, auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { mediaId, type, watchStatus } = await request.validateUsing(updateUserMediaValidator)

    switch (type) {
      case 'anime':
        await this._animesService.updateFromWatchlist(mediaId, user.id, watchStatus)
        break

      case 'movie':
        break

      case 'tvshow':
        break

      default:
        break
    }

    return serialize({ success: true })
  }
}
