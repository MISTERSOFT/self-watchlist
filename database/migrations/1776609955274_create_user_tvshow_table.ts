import { withTimestampsTzColumns } from '#core/database/mixins/with_timestamps'
import { withWatchStatusColumn } from '#core/database/mixins/with_watch_status'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_tvshow'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('tvshow_id').references('tvshows.id')
      table.unique(['user_id', 'tvshow_id'])

      withWatchStatusColumn(table)
      table.integer('current_episode').unsigned().defaultTo(0).notNullable()

      withTimestampsTzColumns(table)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
