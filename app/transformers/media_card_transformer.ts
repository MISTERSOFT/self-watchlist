import type Anime from '#models/anime'
import type Movie from '#models/movie'
import type Tvshow from '#models/tvshow'
import BaseMediaTransformer from '#transformers/base_media_transformer'

/**
 * Media transformer (Anime, Movie, Tv Show) for the media card list.
 */
export default class MediaCardTransformer extends BaseMediaTransformer<Anime | Movie | Tvshow> {
  constructor(resource: Anime | Movie | Tvshow) {
    super(resource)
  }

  toObject() {
    return {
      __type__: this.getType(),
      ...this.pick(this.resource, ['id', 'title', 'thumbnailUrl']),
    }
  }
}
