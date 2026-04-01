import Anime from '#models/anime'
import { BaseTransformer } from '@adonisjs/core/transformers'

type Media = Anime // | Media | TVShow
type MediaType = '__anime__' | '__movie__' | '__tvshow__'

export default class MediaTransformer extends BaseTransformer<Media> {
  toObject() {
    return {
      __type__: this._getType(),
      id: this.resource.id,
      title: this.resource.title,
      thumbnailUrl: this.resource.thumbnailUrl,
    }
  }

  private _getType(): MediaType {
    if (this.resource instanceof Anime) {
      return '__anime__'
    }
    // if (this.resource instanceof Movie) {
    //   return '__movie__'
    // }
    // if (this.resource instanceof TVShow) {
    //   return '__tvshow__'
    // }
    throw new Error('MediaType not matched.')
  }
}
