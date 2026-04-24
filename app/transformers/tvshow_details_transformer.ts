import type Tvshow from '#models/tvshow'
import BaseMediaTransformer from '#transformers/base_media_transformer'
import GenreTransformer from '#transformers/genre_transformer'

export default class TvshowDetailsTransformer extends BaseMediaTransformer<Tvshow> {
  private type = 'tvshow' as const

  constructor(resource: Tvshow) {
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
