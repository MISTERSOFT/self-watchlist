import Anime from '#models/anime'
import Movie from '#models/movie'
import Tvshow from '#models/tvshow'
import { BaseTransformer } from '@adonisjs/core/transformers'

type MediaType = 'anime' | 'movie' | 'tvshow'

/**
 * Parent class transformer for Anime, Movie & TV Show transformers.
 */
export default class BaseMediaTransformer<
  T extends Anime | Movie | Tvshow,
> extends BaseTransformer<T> {
  protected getType(): MediaType {
    if (this.resource instanceof Anime) {
      return 'anime'
    }
    if (this.resource instanceof Movie) {
      return 'movie'
    }
    if (this.resource instanceof Tvshow) {
      return 'tvshow'
    }
    throw new Error('MediaType not matched.')
  }

  protected computeTrailerUrl() {
    if (!this.resource.trailerId || !this.resource.trailerSource) {
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
