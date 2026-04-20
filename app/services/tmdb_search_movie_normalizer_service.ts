import type Movie from '#models/movie'
import { AbstractNormalizerService } from '#services/abstract_normalizer_service'
import type { TMDBSearchMovie } from '#services/tmdb_service'

type NormalizedData = Partial<Movie>

export class TmdbSearchMovieNormalizerService extends AbstractNormalizerService<
  Movie,
  TMDBSearchMovie,
  NormalizedData
> {
  normalizeData(data: TMDBSearchMovie[]): Promise<NormalizedData[]> {
    return Promise.resolve(data.map(this.normalize))
  }
  normalize(data: TMDBSearchMovie): Partial<Movie> {
    // const date = data.release_date.split('-')

    return {
      externalSourceId: data.id.toString(),
      externalSource: 'tmdb',
      title: data.title,
      alternativeTitles: data.original_title,
      synopsis: data.overview,
      thumbnailUrl: data.poster_path,
      score: data.vote_average,
      // status: data.
      nsfw: data.adult,
      // releasedAt: DateTime.fromObject(
      //   {
      //     year: +date[0],
      //     month: +date[1],
      //     day: +date[2],
      //   },
      //   { zone: 'Europe/Paris' }
      // ),
    }
  }
}
