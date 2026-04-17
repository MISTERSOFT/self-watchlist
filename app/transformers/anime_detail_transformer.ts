import type Anime from '#models/anime'
import GenreTransformer from '#transformers/genre_transformer'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class AnimeDetailTransformer extends BaseTransformer<Anime> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'alternativeTitles',
        'backgroundUrl',
        'episodesCount',
        'id',
        'myanimelistId',
        'nsfw',
        'releasedAt',
        'score',
        'season',
        'seasonYear',
        'status',
        'synopsis',
        'thumbnailUrl',
        'title',
        'trailerId',
        'trailerSource',
        'type',
      ]),
      trailerUrl: this._computeTrailerUrl(),
      genres: GenreTransformer.transform(this.resource.genres),
      watch_status: this.resource.users[0].$extras.pivot_watch_status,
    }
  }

  private _computeTrailerUrl() {
    if (!this.resource.trailerId && !this.resource.trailerSource) {
      return null
    }

    switch (this.resource.trailerSource) {
      case 'youtube':
        return `https://www.youtube.com/embed/${this.resource.trailerId}`

      default:
        return ''
    }
  }
}
