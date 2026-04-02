import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'anime_genres'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('anime_id').unsigned().references('animes.id').onDelete('CASCADE')
      table.integer('genre_id').unsigned().references('genres.id')
      table.unique(['anime_id', 'genre_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
