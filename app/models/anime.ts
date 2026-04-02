import { AnimeSchema } from '#database/schema'
import Genre from '#models/genre'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Anime extends AnimeSchema {
  /**
   * An anime has many genres
   */
  @hasMany(() => Genre)
  declare genres: HasMany<typeof Genre>
}
