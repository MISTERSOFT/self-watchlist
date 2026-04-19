import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('external_source_id').nullable() // Movie ID in the provider database
      table.string('external_source').nullable() // Provider: TMDB, etc...
      table.string('tmdb_id').nullable() // ex: TMDB ID

      table.string('title').notNullable()
      table.text('alternative_titles').nullable()
      table.text('synopsis').nullable()
      table.string('thumbnail_url').nullable()
      table.decimal('score', 3, 1).nullable()
      table.string('status').nullable()
      table.boolean('nsfw').notNullable().defaultTo(false)
      table.date('released_at').notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
