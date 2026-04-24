import Genre from '#models/genre'
import { TmdbService } from '#services/tmdb_service'
import { inject } from '@adonisjs/core'
import { BaseCommand, flags } from '@adonisjs/core/ace'
import stringHelpers from '@adonisjs/core/helpers/string'
import app from '@adonisjs/core/services/app'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import db from '@adonisjs/lucid/services/db'
import { ModelAttributes } from '@adonisjs/lucid/types/model'
import vine from '@vinejs/vine'
import { flatten, flow, uniq } from 'es-toolkit'
import fsAsync from 'node:fs/promises'

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
  static description =
    'Fetch genres from Kitsu.app and TMDB, ensure uniqueness, then insert them into database.'

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  @flags.boolean({
    default: true,
    description: 'Use cached genres to populate the database.',
  })
  declare cache: boolean

  //#region Lifecyles

  @inject()
  async run(tmdbService: TmdbService) {
    const cacheFilePath = app.tmpPath('cache-genres.json')
    let cacheFileExists = true

    this.logger.info('Check if cache file exists...')
    try {
      await fsAsync.access(cacheFilePath, fsAsync.constants.F_OK)
      this.logger.info(`Cache file exists`)
    } catch {
      cacheFileExists = false
      this.logger.info(`Cache file doesn't exists`)
    }

    let genresToCreate: Partial<ModelAttributes<Genre>>[] = []

    if (cacheFileExists) {
      const fileContent = await fsAsync.readFile(cacheFilePath, { encoding: 'utf-8' })
      try {
        genresToCreate = JSON.parse(fileContent)
      } catch {
        this.logger.error('Unable to parse cache file.')
        this.terminate()
      }
    } else {
      genresToCreate = await this.fetchGenres(tmdbService)
      await this.cacheData(cacheFilePath, genresToCreate)
    }

    this.logger.info('Saving genres...')
    await db.transaction(async (trx) => {
      await Genre.createMany(genresToCreate, { client: trx })
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

  /**
   * Cache genres into a file as JSON
   */
  async cacheData(cacheFilePath: string, genres: any) {
    try {
      await fsAsync.writeFile(cacheFilePath, JSON.stringify(genres), 'utf-8')
      this.logger.info(`Cache file created at: ${cacheFilePath}`)
    } catch {
      this.logger.error(`Unable to create a cache file.`)
      this.terminate()
    }
  }

  /**
   * Fetch genres from TMDB and Kitsu.app
   * @param tmdbService TMDB service
   * @returns Sanitized list of genre
   */
  async fetchGenres(tmdbService: TmdbService) {
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

    return cleanProcessor(combined)
  }

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
