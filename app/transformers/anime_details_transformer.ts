import type Anime from '#models/anime'
import BaseMediaTransformer from '#transformers/base_media_transformer'
import GenreTransformer from '#transformers/genre_transformer'

/**
 * Anime transformer for the detailed media sidebar.
 */
export default class AnimeDetailsTransformer extends BaseMediaTransformer<Anime> {
  private type = 'anime' as const
  constructor(resource: Anime) {
    super(resource)
  }

  toObject() {
    return {
      __type__: this.type,
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
      trailerUrl: this.computeTrailerUrl(),
      genres: GenreTransformer.transform(this.resource.genres),
      watch_status: this.resource.users[0].$extras.pivot_watch_status,
    }
  }
}
