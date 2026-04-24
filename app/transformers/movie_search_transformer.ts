import type { TMDBSearchMovie } from '#services/tmdb_service'
import { BaseTransformer } from '@adonisjs/core/transformers'
import { DateTime } from 'luxon'

export default class MovieSearchTransformer extends BaseTransformer<TMDBSearchMovie> {
  toObject() {
    return {
      type: 'movie' as const,
      externalSourceId: this.resource.id.toString(),
      externalSource: 'tmdb',
      title: this.resource.title,
      alternativeTitles: this.resource.original_title,
      thumbnailUrl: this.resource.poster_path,
      score: this.resource.vote_average,
      nsfw: this.resource.adult,
      releasedAt: DateTime.fromISO(this.resource.release_date),
    }
  }
}
