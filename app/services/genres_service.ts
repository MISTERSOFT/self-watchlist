import Genre from '#models/genre'
import stringHelpers from '@adonisjs/core/helpers/string'
import { flatten, flow, uniq } from 'es-toolkit'
import Fuse from 'fuse.js'

export class GenresService {
  /**
   * From a list of string genres, match all genre records.
   * @param stringGenres List of string genres
   * @returns List of `Genre` instance
   */
  async matchAll(stringGenres: string[]) {
    if (!stringGenres || stringGenres.length === 0) {
      return []
    }

    const genres = await Genre.all()

    // Clean, format and ensure uniqueness of genres
    const processed: string[] = flow(
      (_strings: string[]) => _strings.map((x) => x.split('&')),
      flatten,
      uniq,
      (_strings: string[]) => _strings.map((x) => x.toLowerCase()),
      (_strings: string[]) => _strings.map((x) => stringHelpers.condenseWhitespace(x))
    )(stringGenres)

    const fuse = new Fuse(genres, {
      includeScore: true,
      keys: ['name'],
    })

    let matched: Genre[] = []
    processed.forEach((q) => {
      const result = fuse.search(q).filter((r) => r.score! < 0.1)
      matched = matched.concat(result.map((x) => x.item))
    })

    return matched
  }
}
