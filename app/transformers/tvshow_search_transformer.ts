import type { TMDBSearchTVShow } from '#services/tmdb_service'
import { BaseTransformer } from '@adonisjs/core/transformers'
import { DateTime } from 'luxon'

export default class TvshowSearchTransformer extends BaseTransformer<TMDBSearchTVShow> {
  toObject() {
    return {
      type: 'tvshow' as const,
      externalSource: 'tmdb',
      externalSourceId: this.resource.id.toString(),
      nsfw: this.resource.adult,
      releasedAt: DateTime.fromISO(this.resource.first_air_date),
      synopsis: this.resource.overview,
      thumbnailUrl: this.resource.poster_path,
      title: this.resource.name,
      score: this.resource.vote_average,
    }
  }
}
