import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_tvshow'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('tvshow_id').unsigned().references('tvshows.id')
      table.unique(['user_id', 'tvshow_id'])

      table.string('watch_status').notNullable() // Plan to watch, Watching, Completed, On-hold, dropped
      table.integer('current_episode').unsigned().defaultTo(0).notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
