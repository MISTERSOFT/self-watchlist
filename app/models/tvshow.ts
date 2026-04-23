import { WithNanoIdPk } from '#core/database/mixins/with_nanoid_pk'
import { WithTimestamps } from '#core/database/mixins/with_timestamps'
import { TvshowSchema } from '#database/schema'
import Genre from '#models/genre'
import User from '#models/user'
import { compose } from '@adonisjs/core/helpers'
import { manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Tvshow extends compose(TvshowSchema, WithNanoIdPk, WithTimestamps) {
  /**
   * A TV Show has many genres
   */
  @manyToMany(() => Genre, {
    pivotTable: 'tvshow_genre',
  })
  declare genres: ManyToMany<typeof Genre>

  /**
   * A TV Show can be watch by many users
   */
  @manyToMany(() => User, {
    pivotTable: 'user_tvshow',
    pivotTimestamps: true,
    pivotColumns: ['watch_status'],
  })
  declare users: ManyToMany<typeof User>
}
