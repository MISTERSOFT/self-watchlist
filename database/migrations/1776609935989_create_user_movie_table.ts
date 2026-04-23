import { withTimestampsTzColumns } from '#core/database/mixins/with_timestamps'
import { withWatchStatusColumn } from '#core/database/mixins/with_watch_status'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_movie'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('movie_id').unsigned().references('movies.id')
      table.unique(['user_id', 'movie_id'])

      withWatchStatusColumn(table)
      withTimestampsTzColumns(table)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
