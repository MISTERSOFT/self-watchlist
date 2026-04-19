import { MovieSchema } from '#database/schema'
import Genre from '#models/genre'
import User from '#models/user'
import { manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Movie extends MovieSchema {
  /**
   * A movie has many genres
   */
  @manyToMany(() => Genre)
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
