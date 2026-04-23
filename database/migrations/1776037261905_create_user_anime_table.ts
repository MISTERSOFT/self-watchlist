import { withTimestampsTzColumns } from '#core/database/mixins/with_timestamps'
import { withWatchStatusColumn } from '#core/database/mixins/with_watch_status'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_anime'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('anime_id').references('animes.id')
      table.unique(['user_id', 'anime_id'])

      withWatchStatusColumn(table)
      table.integer('current_episode').unsigned().defaultTo(0).notNullable()

      withTimestampsTzColumns(table)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
