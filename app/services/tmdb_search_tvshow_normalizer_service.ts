import type Tvshow from '#models/tvshow'
import { AbstractNormalizerService } from '#services/abstract_normalizer_service'
import type { TMDBSearchTVShow } from '#services/tmdb_service'
import { DateTime } from 'luxon'

export class TmdbSearchTvshowNormalizerService extends AbstractNormalizerService<
  Tvshow,
  TMDBSearchTVShow
> {
  normalize(data: TMDBSearchTVShow[]): Promise<Partial<Tvshow>[]>
  normalize(data: TMDBSearchTVShow): Promise<Partial<Tvshow>>
  normalize(
    data: TMDBSearchTVShow | TMDBSearchTVShow[]
  ): Promise<Partial<Tvshow> | Partial<Tvshow>[]> {
    if (Array.isArray(data)) {
      return Promise.resolve(data.map(this._normalize))
    }
    return Promise.resolve(this._normalize(data))
  }

  private _normalize(data: TMDBSearchTVShow): Partial<Tvshow> {
    // const date = data.first_air_date.split('-')

    return {
      nsfw: data.adult,
      thumbnailUrl: data.poster_path,
      externalSourceId: data.id.toString(),
      externalSource: 'tmdb',
      synopsis: data.overview,
      title: data.name,
      releasedAt: DateTime.fromISO(data.first_air_date),
      // releasedAt: DateTime.fromObject(
      //   {
      //     year: +date[0],
      //     month: +date[1],
      //     day: +date[2],
      //   },
      //   { zone: 'Europe/Paris' }
      // ),
      // first_air_date: string
      // vote_average: number
      // vote_count: number
    }
  }
}
