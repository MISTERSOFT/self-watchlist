import { WithTimestamps } from '#core/database/mixins/with_timestamps'
import { WithUniqueMediaIdentifier } from '#core/database/mixins/with_unique_media_identifier'
import { MovieSchema } from '#database/schema'
import Genre from '#models/genre'
import User from '#models/user'
import { compose } from '@adonisjs/core/helpers'
import { manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Movie extends compose(MovieSchema, WithUniqueMediaIdentifier, WithTimestamps) {
  /**
   * A movie has many genres
   */
  @manyToMany(() => Genre, {
    pivotTable: 'movie_genre',
  })
  declare genres: ManyToMany<typeof Genre>

  /**
   * A movie can be watch by many users
   */
  @manyToMany(() => User, {
    pivotTable: 'user_movie',
    pivotTimestamps: true,
    pivotColumns: ['watch_status'],
  })
  declare users: ManyToMany<typeof User>
}
