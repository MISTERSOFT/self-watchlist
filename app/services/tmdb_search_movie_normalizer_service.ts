import type Movie from '#models/movie'
import { AbstractNormalizerService } from '#services/abstract_normalizer_service'
import type { TMDBSearchMovie } from '#services/tmdb_service'
import { DateTime } from 'luxon'

export class TmdbSearchMovieNormalizerService extends AbstractNormalizerService<
  Movie,
  TMDBSearchMovie
> {
  normalize(data: TMDBSearchMovie[]): Promise<Partial<Movie>[]>
  normalize(data: TMDBSearchMovie): Promise<Partial<Movie>>
  normalize(data: TMDBSearchMovie | TMDBSearchMovie[]): Promise<Partial<Movie> | Partial<Movie>[]> {
    if (Array.isArray(data)) {
      return Promise.resolve(data.map(this._normalize))
    }
    return Promise.resolve(this._normalize(data))
  }

  private _normalize(data: TMDBSearchMovie): Partial<Movie> {
    // const date = data.release_date.split('-')

    return {
      externalSourceId: data.id.toString(),
      externalSource: 'tmdb',
      title: data.title,
      alternativeTitles: data.original_title,
      synopsis: data.overview,
      thumbnailUrl: data.poster_path,
      score: data.vote_average,
      nsfw: data.adult,
      releasedAt: DateTime.fromISO(data.release_date), // { zone: 'Europe/Paris' }
    }
  }
}
