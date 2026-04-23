import Movie from '#models/movie'
import { AnilistService } from '#services/anilist_service'
import { AnimesService } from '#services/animes_service'
import { MoviesService } from '#services/movies_service'
import { TMDBAlternativeTitleObject, TmdbService, TMDBVideoObject } from '#services/tmdb_service'
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
    private readonly _moviesService: MoviesService
  ) {}

  async getUserWatchlist(userId: number) {
    return await Promise.all([
      this._animesService.getAnimesToWatchByUser(userId),
      this._moviesService.getMoviesToWatchByUser(userId),
      // this._tvshowsService.getTvShowsToWatchByUser(userId), TODO: Load user's watchlist
    ])
  }

  async getUserMedia(mediaId: string, userId: number) {
    const anime = await this._animesService.getByIdAndByUser(mediaId, userId)
    if (anime) {
      return anime
    }

    const movie = await this._moviesService.getByIdAndByUser(mediaId, userId)
    if (movie) {
      return movie
    }

    return null
  }

  async addAnime(anilistAnimeId: number, userId: number) {
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
}
