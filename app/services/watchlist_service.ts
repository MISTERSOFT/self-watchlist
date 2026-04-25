import UpdateWatchStatusFailedException from '#exceptions/update_watch_status_failed_exception'
import Movie from '#models/movie'
import Tvshow from '#models/tvshow'
import { AnimeRepository } from '#repositories/anime_repository'
import { MovieRepository } from '#repositories/movie_repository'
import { TvshowRepository } from '#repositories/tvshow_repository'
import { AnilistService } from '#services/anilist_service'
import { AnimesService } from '#services/animes_service'
import { MoviesService } from '#services/movies_service'
import { TMDBAlternativeTitleObject, TmdbService, TMDBVideoObject } from '#services/tmdb_service'
import { WatchStatus } from '#types/types'
import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'
import { GenresService } from './genres_service.ts'

@inject()
export class WatchlistService {
  constructor(
    private readonly _genresService: GenresService,
    private readonly _anilistService: AnilistService,
    private readonly _tmdbService: TmdbService,
    private readonly _animesService: AnimesService,
    private readonly _moviesService: MoviesService,
    private readonly _animeRepository: AnimeRepository,
    private readonly _movieRepository: MovieRepository,
    private readonly _tvshowRepository: TvshowRepository
  ) {}

  async getUserWatchlist(userId: number, filters: { watchStatus: WatchStatus }) {
    return await Promise.all([
      this._animesService.getAnimesByUser(userId, filters),
      this._moviesService.getMoviesByUser(userId, filters),
      this._tvshowRepository.getTvshowsByUser(userId, filters),
    ])
  }

  /**
   * Get a specific media attached to the user.
   *
   * @param mediaId Media id
   * @param userId User id
   * @returns The media (Anime, Movie, Tvshow)
   */
  async getUserMedia(mediaId: string, userId: number) {
    // Run all 3 requests in parralel to get the media, only one will be retrieved
    const media = await Promise.any([
      this._animesService.getByIdAndByUser(mediaId, userId),
      this._moviesService.getByIdAndByUser(mediaId, userId),
      this._tvshowRepository.getByIdAndByUser(mediaId, userId),
    ])
    return media
  }

  /**
   * Add anime to the user watchlist.
   *
   * @param anilistAnimeId ID of the Anilist anime to fetch
   * @param userId The user ID to associate with the anime
   * @returns The anime title
   */
  async addAnime(anilistAnimeId: number, userId: number) {
    // TODO: Check if movie is already in database before creating a new movie record
    const queryResult = await this._anilistService.getByMediaId({ mediaId: anilistAnimeId })
    await this._animesService.saveAnilistGqlMedia(
      queryResult.Page?.media,
      userId,
      () => 'plan_to_watch'
    )

    const media = queryResult.Page?.media![0]!
    return media.title?.romaji! || media.title?.english! || media.title?.native!
  }

  async addMovie(tmdbMovieId: number, userId: number) {
    // TODO: Check if movie is already in database before creating a new movie record
    const details = await this._tmdbService.getMovieById<{
      videos: { results: TMDBVideoObject[] }
      alternative_titles: { titles: TMDBAlternativeTitleObject[] }
    }>(tmdbMovieId, {
      append_to_response: 'videos,alternative_titles',
    })

    const officialTrailer = details.videos.results
      .sort((a, b) => {
        if (new Date(a.published_at) < new Date(b.published_at)) return -1
        if (new Date(a.published_at) > new Date(b.published_at)) return 1
        return 0
      })
      .find((x) => x.official && x.type.toLowerCase() === 'trailer')

    const toSave = new Movie()
    toSave.alternativeTitles = details.alternative_titles.titles.map((x) => x.title).join(',')
    toSave.externalSource = 'tmdb'
    toSave.externalSourceId = details.id.toString()
    toSave.nsfw = details.adult
    toSave.releasedAt = DateTime.fromISO(details.release_date) // { zone: 'Europe/Paris' }
    toSave.score = details.vote_average
    // normalized.status = details.status
    toSave.backgroundUrl = details.backdrop_path
    toSave.trailerSource = officialTrailer?.site.toLowerCase() || null
    toSave.trailerId = officialTrailer?.key || null
    toSave.synopsis = details.overview
    toSave.thumbnailUrl = details.poster_path
    toSave.title = details.title

    const movieGenres = await this._genresService.matchAll(details.genres.map((x) => x.name))

    const saved = await this._moviesService.save(toSave, movieGenres)
    await this._moviesService.addToUserWatchlist(saved, userId, 'plan_to_watch')

    return saved.title
  }

  async addTvShow(tmdbTvShowId: number, userId: number) {
    // TODO: Check if movie is already in database before creating a new movie record
    const details = await this._tmdbService.getTVShowById<{
      videos: { results: TMDBVideoObject[] }
      alternative_titles: { results: TMDBAlternativeTitleObject[] }
    }>(tmdbTvShowId, {
      append_to_response: 'videos,alternative_titles',
    })

    const officialTrailer = details.videos.results
      .sort((a, b) => {
        if (new Date(a.published_at) < new Date(b.published_at)) return -1
        if (new Date(a.published_at) > new Date(b.published_at)) return 1
        return 0
      })
      .find((x) => x.official && x.type.toLowerCase() === 'trailer')

    const toSave = new Tvshow()
    toSave.alternativeTitles = details.alternative_titles.results.map((x) => x.title).join(',')
    toSave.externalSource = 'tmdb'
    toSave.externalSourceId = details.id.toString()
    toSave.nsfw = details.adult
    toSave.releasedAt = DateTime.fromISO(details.first_air_date) // { zone: 'Europe/Paris' }
    toSave.score = details.vote_average
    toSave.status = details.status
    toSave.backgroundUrl = details.backdrop_path
    toSave.trailerSource = officialTrailer?.site.toLowerCase() || null
    toSave.trailerId = officialTrailer?.key || null
    toSave.synopsis = details.overview
    toSave.thumbnailUrl = details.poster_path
    toSave.title = details.name

    const tvshowGenres = await this._genresService.matchAll(details.genres.map((x) => x.name))

    const saved = await this._tvshowRepository.save(toSave, tvshowGenres)
    await this._tvshowRepository.addToUserWatchlist(saved, userId, 'plan_to_watch')

    return saved.title
  }

  /**
   * Remove anime from user's watchlist.
   *
   * @param animeId Anime ID
   * @param userId User ID
   */
  async removeAnimeFromUserWatchlist(animeId: string, userId: number) {
    await this._animeRepository.detachUser(animeId, userId)
  }

  /**
   * Remove movie from user's watchlist.
   *
   * @param movieId Movie ID
   * @param userId User ID
   */
  async removeMovieFromUserWatchlist(movieId: string, userId: number) {
    await this._movieRepository.detachUser(movieId, userId)
  }

  /**
   * Remove tvshow from user's watchlist.
   *
   * @param tvshowId Tvshow ID
   * @param userId User ID
   */
  async removeTvshowFromUserWatchlist(tvshowId: string, userId: number) {
    await this._tvshowRepository.detachUser(tvshowId, userId)
  }

  /**
   * Update the watch status of the user's Anime, Movie or Tvshow.
   *
   * @param type anime, movie, tvshow
   * @param mediaId Anime, movie, tvshow id
   * @param userId User id
   * @param watchStatus Watch status to set
   */
  async updateWatchStatus(
    type: 'anime' | 'movie' | 'tvshow',
    mediaId: string,
    userId: number,
    watchStatus: WatchStatus
  ) {
    try {
      switch (type) {
        case 'anime':
          await this._animeRepository.updateWatchStatus(mediaId, userId, watchStatus)
          break
        case 'movie':
          await this._movieRepository.updateWatchStatus(mediaId, userId, watchStatus)
          break
        case 'tvshow':
          await this._tvshowRepository.updateWatchStatus(mediaId, userId, watchStatus)
          break

        default:
          break
      }
    } catch {
      throw new UpdateWatchStatusFailedException()
    }
  }
}
