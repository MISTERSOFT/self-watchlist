import type Movie from '#models/movie'
import BaseMediaTransformer from '#transformers/base_media_transformer'
import GenreTransformer from '#transformers/genre_transformer'

/**
 * Movie transformer for the detailed media sidebar.
 */
export default class MovieDetailsTransformer extends BaseMediaTransformer<Movie> {
  private type = 'movie' as const

  constructor(resource: Movie) {
    super(resource)
  }

  toObject() {
    return {
      __type__: this.type,
      ...this.pick(this.resource, [
        'alternativeTitles',
        'backgroundUrl',
        'externalSource',
        'externalSourceId',
        'id',
        'nsfw',
        'releasedAt',
        'synopsis',
        'thumbnailUrl',
        'title',
        'trailerId',
        'trailerSource',
      ]),
      score: this.resource.score?.toFixed(1),
      trailerUrl: this.computeTrailerUrl(),
      genres: GenreTransformer.transform(this.resource.genres),
      watch_status: this.resource.users[0].$extras.pivot_watch_status,
    }
  }
}
