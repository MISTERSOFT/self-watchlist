import type Genre from '#models/genre'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class GenreTransformer extends BaseTransformer<Genre> {
  toObject() {
    return this.pick(this.resource, ['id', 'name'])
  }
}
