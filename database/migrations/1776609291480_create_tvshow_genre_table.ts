import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tvshow_genre'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('tvshow_id').references('tvshows.id').onDelete('CASCADE')
      table.integer('genre_id').unsigned().references('genres.id')
      table.unique(['tvshow_id', 'genre_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
