import { withNanoIdPkColumn } from '#core/database/mixins/with_nanoid_pk'
import { withTimestampsTzColumns } from '#core/database/mixins/with_timestamps'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tvshows'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      withNanoIdPkColumn(table)

      table.string('external_source_id').nullable() // TVShow ID in the provider database
      table.string('external_source').nullable() // Provider: TMDB, etc...

      table.string('title').notNullable()
      table.text('alternative_titles').nullable()
      table.text('synopsis').nullable()
      table.string('thumbnail_url').nullable()
      table.text('background_url').nullable()
      table.string('trailer_source').nullable()
      table.string('trailer_id').nullable()
      table.decimal('score', 3, 1).nullable()
      table.string('status').nullable()
      table.integer('number_of_episodes').nullable()
      table.integer('number_of_seasons').nullable()
      table.boolean('nsfw').notNullable().defaultTo(false)
      table.date('released_at').notNullable()

      withTimestampsTzColumns(table)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
