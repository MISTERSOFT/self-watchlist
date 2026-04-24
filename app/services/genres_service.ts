import Genre from '#models/genre'
import stringHelpers from '@adonisjs/core/helpers/string'
import { flatten, flow, uniq } from 'es-toolkit'
import Fuse from 'fuse.js'

export class GenresService {
  /**
   * Clean, format and ensure uniqueness of genres
   */
  private sanitizeGenresFn = flow(
    (_strings: string[]) => _strings.map((x) => x.split('&')),
    flatten,
    uniq,
    (_strings: string[]) => _strings.map((x) => x.toLowerCase()),
    (_strings: string[]) => _strings.map((x) => stringHelpers.condenseWhitespace(x))
  )

  /**
   * From a list of string genres, match all genre records.
   * @param stringGenres List of string genres
   * @returns List of `Genre` instance
   */
  async matchAll(stringGenres: string[], genres?: Genre[]): Promise<Genre[]> {
    const hasGenresParam = Array.isArray(genres) // Also check if undefined or null

    if (!stringGenres || stringGenres.length === 0) {
      return []
    }

    let genreList: Genre[] = genres || []
    if (!hasGenresParam) {
      genreList = await Genre.all()
    }

    return this._matchAll(stringGenres, genreList)
  }

  private _matchAll(stringGenres: string[], genres: Genre[]) {
    const sanitized: string[] = this.sanitizeGenresFn(stringGenres)

    const fuse = new Fuse(genres, {
      includeScore: true,
      keys: ['name'],
    })

    let matched: Genre[] = []
    sanitized.forEach((q) => {
      const result = fuse.search(q).filter((r) => r.score! < 0.1)
      matched = matched.concat(result.map((x) => x.item))
    })

    return matched
  }
}
