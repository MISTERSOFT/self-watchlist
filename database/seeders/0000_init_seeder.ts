import Genre from '#models/genre'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import vine from '@vinejs/vine'

// data: { attributes: { name: string, slug: string } }[], links: { first: string, next?: string, last: string }

// Schema to validate data from Kitsu API
const kitsuGenreSchema = vine.object({
  data: vine.array(
    vine.object({
      attributes: vine.object({
        name: vine.string(),
        slug: vine.string(),
      }),
    })
  ),
  links: vine.object({
    first: vine.string(),
    next: vine.string().optional(),
    last: vine.string(),
  }),
})

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await this.createDefaultUser()
    await this.createAnimeGenres()
  }

  async createDefaultUser() {
    await User.create({
      email: 'root@dev.fr',
      fullName: 'Root',
      password: 'rootroot',
    })
  }

  async fetchNextGenrePage(url: string) {
    // Fetch les données depuis l'API Kitsu.app (donnée en anglais)
    let genres: Partial<Genre>[] = []
    const response = await fetch(url)
    const json = await response.json()
    const result = await vine.validate({
      schema: kitsuGenreSchema,
      data: json,
    })

    for (let i = 0; i < result['data'].length; i++) {
      const item = result['data'][i]['attributes']
      genres.push({
        name: item['name'],
        slug: item['slug'],
      })
    }

    return { genres, nextPageUrl: result['links']['next'] }
  }

  async createAnimeGenres() {
    let genres: Partial<Genre>[] = []

    // Fetch les données depuis l'API Kitsu.app (donnée en anglais)
    let nextUrl: string | undefined = 'https://kitsu.app/api/edge/genres'
    do {
      const data = await this.fetchNextGenrePage(nextUrl)
      genres = genres.concat(data.genres)
      nextUrl = data.nextPageUrl
    } while (nextUrl)

    await Genre.createMany(genres)
  }
}
