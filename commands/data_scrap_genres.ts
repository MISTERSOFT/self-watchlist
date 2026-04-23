import Genre from '#models/genre'
import { TmdbService } from '#services/tmdb_service'
import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { flatten, flow, uniq } from 'es-toolkit'

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

export default class DataScrapGenres extends BaseCommand {
  static commandName = 'data:scrap:genres'
  static description = 'Fetch (from Kitsu & TMDB) and insert genres into databse'

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  static help?: string | string[] | undefined = [
    'This command fetch genres from Kitsu.app and TMDB, ensure uniqueness, then insert them into database.',
  ]

  //#region Lifecyles

  @inject()
  async run(tmdbService: TmdbService) {
    this.logger.info('Fetching Kitsu.app genres...')
    const kitsuGenres = await this.fetchGenresFromKitsu()

    this.logger.info('Fetching TMDB Movie genres...')
    const tmdbMovieGenres = await tmdbService.getMovieGenres()

    this.logger.info('Fetching TMDB TV Show genres...')
    const tmdbTvShowsGenres = await tmdbService.getTVShowGenres()

    this.logger.info('Cleaning genres...')
    const combined = [
      ...kitsuGenres.map((x) => x.name!),
      ...tmdbMovieGenres.genres.map((x) => x.name),
      ...tmdbTvShowsGenres.genres.map((x) => x.name),
    ]

    // Flow function that clean and ensure uniqueness
    const cleanProcessor: (_strings: string[]) => Array<{ name: string; slug: string }> = flow(
      (_strings: string[]) => _strings.map((x) => x.split('&')),
      flatten,
      (_strings: string[]) => _strings.map((x) => x.toLowerCase()),
      (_strings: string[]) => _strings.map((x) => stringHelpers.condenseWhitespace(x)),
      uniq,
      (_strings: string[]) =>
        _strings.map((x) => ({
          name: stringHelpers.sentenceCase(x),
          slug: stringHelpers.slug(x, { strict: true, locale: 'en' }),
        }))
    )

    const cleanedGenres = cleanProcessor(combined)

    this.logger.info('Saving cleaned genres...')
    await db.transaction(async (trx) => {
      await Genre.createMany(cleanedGenres, { client: trx })
    })
    this.logger.success('Done.')
  }

  async completed() {
    if (this.error) {
      /**
       * Handle the error from any lifecycle method
       */
      this.logger.error(this.error.message)

      /**
       * Return true to notify Ace that you've handled the error
       * This prevents Ace from logging the error again
       */
      return true
    }
  }

  //#endregion

  //#region Methods

  async fetchKitsuNextGenresPage(url: string) {
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

  /**
   * Fetch genres from Kitsu.app
   */
  async fetchGenresFromKitsu() {
    let genres: Partial<Genre>[] = []

    // Fetch data from Kitsu.app API
    let nextUrl: string | undefined = 'https://kitsu.app/api/edge/genres'
    do {
      const data = await this.fetchKitsuNextGenresPage(nextUrl)
      genres = genres.concat(data.genres)
      nextUrl = data.nextPageUrl
    } while (nextUrl)

    return genres
  }

  //#endregion
}
