import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'anime_genre'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('anime_id').references('animes.id').onDelete('CASCADE')
      table.integer('genre_id').unsigned().references('genres.id')
      table.unique(['anime_id', 'genre_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
