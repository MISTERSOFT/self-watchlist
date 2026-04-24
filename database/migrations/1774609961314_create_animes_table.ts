import { withNanoIdPkColumn } from '#core/database/mixins/with_nanoid_pk'
import { withTimestampsTzColumns } from '#core/database/mixins/with_timestamps'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'animes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      withNanoIdPkColumn(table)

      table.string('external_source_id').nullable() // Anime ID in the provider database
      table.string('external_source').nullable() // Provider: anilist, jikan, etc...
      table.string('myanimelist_id').nullable() // MyAnimeList ID

      // table.text('slug').notNullable().unique()
      table.text('title').notNullable()
      table.text('alternative_titles').nullable()
      table.string('format').nullable()
      table.text('synopsis').nullable()
      table.decimal('score', 3, 1).nullable()
      table.string('status').nullable()
      table.string('season').nullable()
      table.integer('season_year').nullable()
      table.text('thumbnail_url').nullable()
      table.text('background_url').nullable()
      table.string('trailer_source').nullable()
      table.string('trailer_id').nullable()
      table.integer('episodes_count').nullable()
      table.boolean('nsfw').notNullable().defaultTo(false)
      table.timestamp('released_at', { useTz: true }).notNullable()

      withTimestampsTzColumns(table)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
