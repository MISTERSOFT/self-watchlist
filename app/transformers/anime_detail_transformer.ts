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
      genres: GenreTransformer.transform(this.resource.genres),
      watch_status: this.resource.users[0].$extras.pivot_watch_status,
    }
  }
}
