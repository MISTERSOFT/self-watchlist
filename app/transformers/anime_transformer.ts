import type Anime from '#models/anime'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class AnimeTransformer extends BaseTransformer<Anime> {
  toObject() {
    return this.pick(this.resource, ['id', 'title', 'thumbnailUrl'])
  }
}
