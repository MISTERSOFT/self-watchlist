import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movie_genre'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('movie_id').references('movies.id').onDelete('CASCADE')
      table.integer('genre_id').unsigned().references('genres.id')
      table.unique(['movie_id', 'genre_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
