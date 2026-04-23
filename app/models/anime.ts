import { WithTimestamps } from '#core/database/mixins/with_timestamps'
import { WithUniqueMediaIdentifier } from '#core/database/mixins/with_unique_media_identifier'
import { AnimeSchema } from '#database/schema'
import Genre from '#models/genre'
import User from '#models/user'
import { compose } from '@adonisjs/core/helpers'
import { manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Anime extends compose(AnimeSchema, WithUniqueMediaIdentifier, WithTimestamps) {
  static table = 'animes'
  /**
   * An anime has many genres
   */
  @manyToMany(() => Genre)
  declare genres: ManyToMany<typeof Genre>

  /**
   * An anime can be watch by many users
   */
  @manyToMany(() => User, {
    pivotTable: 'user_anime',
    pivotTimestamps: true,
    pivotColumns: ['watch_status'],
  })
  declare users: ManyToMany<typeof User>
}
