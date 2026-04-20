import type Tvshow from '#models/tvshow'
import { AbstractNormalizerService } from '#services/abstract_normalizer_service'
import type { TMDBSearchTVShow } from '#services/tmdb_service'

type NormalizedData = Partial<Tvshow>

export class TmdbSearchTvshowNormalizerService extends AbstractNormalizerService<
  Tvshow,
  TMDBSearchTVShow,
  NormalizedData
> {
  normalizeData(data: TMDBSearchTVShow[]): Promise<Partial<Tvshow>[]> {
    return Promise.resolve(data.map(this.normalize))
  }
  normalize(data: TMDBSearchTVShow): Partial<Tvshow> {
    return {
      nsfw: data.adult,
      thumbnailUrl: data.poster_path,
      externalSourceId: data.id.toString(),
      externalSource: 'tmdb',
      synopsis: data.overview,
      title: data.name,
      // first_air_date: string
      // vote_average: number
      // vote_count: number
    }
  }
}
