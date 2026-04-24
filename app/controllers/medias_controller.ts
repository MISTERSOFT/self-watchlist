import { AnilistService } from '#services/anilist_service'
import { AnimesService } from '#services/animes_service'
import { MoviesService } from '#services/movies_service'
import { TMDBPagination, TMDBSearchTVShow, TmdbService } from '#services/tmdb_service'
import { TvShowsService } from '#services/tv_shows_service'
import { WatchlistService } from '#services/watchlist_service'
import AnimeSearchTransformer from '#transformers/anime_search_transformer'
import MovieSearchTransformer from '#transformers/movie_search_transformer'
import TvshowSearchTransformer from '#transformers/tvshow_search_transformer'
import { SearchQueryMediaItem } from '#types/types'
import {
  addNewMediaValidator,
  deleteUserMediaValidator,
  searchNewMediaValidator,
  updateUserMediaValidator,
} from '#validators/media'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { flow } from 'es-toolkit'

const TMDB_GENRE_ANIMATION_ID = 16
const TMDB_ORIGIN_COUNTRY_JP = 'JP'
const omitAnimesAndAttachedToUserTvshowsFn = flow(
  // Remove tvshows already associated to the user
  (_tvshows: TMDBPagination<TMDBSearchTVShow>['results'], _tvshowIdsAttachedToUser: number[]) =>
    _tvshows.filter((m) => !_tvshowIdsAttachedToUser.includes(m.id)),
  // Remove all Anime from the data
  (_tvshows: TMDBPagination<TMDBSearchTVShow>['results']) =>
    _tvshows.filter(
      (m) =>
        !(
          m.genre_ids.includes(TMDB_GENRE_ANIMATION_ID) &&
          m.origin_country.includes(TMDB_ORIGIN_COUNTRY_JP)
        )
    )
)

@inject()
export default class MediasController {
  constructor(
    protected readonly _anilistService: AnilistService,
    protected readonly _animesService: AnimesService,
    protected readonly _tmdbService: TmdbService,
    protected readonly _moviesService: MoviesService,
    protected readonly _tvshowsService: TvShowsService,
    protected readonly _mediasService: WatchlistService
  ) {}

  async search({ request, response, auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { search, type } = await request.validateUsing(searchNewMediaValidator)

    switch (type) {
      case 'anime':
        // 1. Get Anime IDs attached to the user
        const userAnilistAnimeIds = await this._animesService.getAnimeAnilistIdsByUser(user.id)
        // 2. Search anime
        const result = await this._anilistService.search({
          search,
          // Omit from the search query animes that are already attached to the user in database
          idNotIn: userAnilistAnimeIds,
        })
        // 3. Return transformed data
        return serialize(
          AnimeSearchTransformer.transform(result.Page?.media as SearchQueryMediaItem[])
        )

      case 'movie':
        // 1. Get TMDB movies already in db
        const tmdbMovieIdsInDb = await this._moviesService.getMoviesTMDBIdsByUser(user.id)
        // 2. Search movies
        const movies = await this._tmdbService.searchMovie({ query: search })
        // 3. Searched movies - db movies
        const filteredMovies = movies
          ? movies.results.filter((m) => !tmdbMovieIdsInDb.includes(m.id))
          : []
        // 4. Return transformed data
        return serialize(MovieSearchTransformer.transform(filteredMovies))

      case 'tvshow':
        // 1. Get TMDB TvShow already attached to the user in db
        const tvshowIdsbAttachedToUser = await this._tvshowsService.getTvShowsTMDBIdsByUser(user.id)
        // 2. Search TvShow
        const tvshows = await this._tmdbService.searchTVShow({ query: search, include_adult: true })
        // 3. Filter tvshow to remove :
        //    - those already in db
        //    - those where the origin country is Japon and has an "Animation" (id: 16) genre. In other word, we remove Anime from the result.
        const filteredTvshows = omitAnimesAndAttachedToUserTvshowsFn(
          tvshows.results,
          tvshowIdsbAttachedToUser
        )
        // 4. Return transformed data
        return serialize(TvshowSearchTransformer.transform(filteredTvshows))

      default:
        return response.badRequest()
    }
  }

  async addToWatchlist({ request, auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { externalSourceId, type } = await request.validateUsing(addNewMediaValidator)

    let name = ''

    switch (type) {
      case 'anime':
        name = await this._mediasService.addAnime(externalSourceId, user.id)
        break

      case 'movie':
        name = await this._mediasService.addMovie(externalSourceId, user.id)
        break

      case 'tvshow':
        name = await this._mediasService.addTvShow(externalSourceId, user.id)
        break

      default:
        break
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
        await this._mediasService.removeAnimeFromUserWatchlist(mediaId, user.id)
        break

      case 'movie':
        await this._mediasService.removeMovieFromUserWatchlist(mediaId, user.id)
        break

      case 'tvshow':
        await this._mediasService.removeTvshowFromUserWatchlist(mediaId, user.id)
        break

      default:
        break
    }

    return serialize({ success: true })
  }

  async updateWatchStatus({ request, auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { mediaId, type, watchStatus } = await request.validateUsing(updateUserMediaValidator)

    await this._mediasService.updateWatchStatus(type, mediaId, user.id, watchStatus)

    return serialize({ success: true })
  }
}
