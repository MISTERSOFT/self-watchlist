import type Genre from '#models/genre'
import Movie from '#models/movie'
import type { WatchStatus } from '#types/types'
import db from '@adonisjs/lucid/services/db'

export class MoviesService {
  /**
   * Get user's movies where `watch_status` is different from `completed`.
   *
   * @param userId User id attached to movies
   * @returns User's movies list to watch
   */
  async getMoviesToWatchByUser(userId: number) {
    const movies = await Movie.query().andWhereHas('users', (queryUsers) => {
      queryUsers.where('user_id', userId).where('watch_status', '!=', 'completed')
    })

    return movies
  }

  async getByIdByUser(id: number, userId: number) {
    const movie = await Movie.query()
      .where('id', id)
      .andWhereHas('users', (query) => {
        query.where('user_id', userId)
      })
      .preload('genres')
      .preload('users', (query) => {
        query.pivotColumns(['watch_status'])
      })
      .firstOrFail()
    return movie
  }

  async getByIdAndByUser(id: string, userId: number) {
    const movie = await Movie.query()
      .where('id', id)
      .andWhereHas('users', (query) => {
        query.where('user_id', userId)
      })
      .preload('genres')
      .preload('users', (query) => {
        query.pivotColumns(['watch_status'])
      })
      .first()
    return movie
  }

  /**
   * Get user's TMDB movie ids.
   *
   * @param userId User id attached to movies
   * @returns User's TMDB movie ids list
   */
  async getMoviesTMDBIdsByUser(userId: number) {
    const movies = await Movie.query()
      .select('external_source_id')
      .andWhereHas('users', (queryUsers) => {
        queryUsers.where('user_id', userId)
      })

    return movies.map((movie) => +movie.externalSourceId!)
  }

  async save(movie: Movie, withGenres: Genre[]) {
    // Save in db
    return await db.transaction(async (trx) => {
      movie.useTransaction(trx)
      await movie.save()

      // Associate genres to movie
      await movie.related('genres').attach(withGenres.map((genre) => genre.id))

      return movie
    })
  }

  async addToUserWatchlist(movie: Movie, userId: number, watchStatus: WatchStatus) {
    // Save in db
    await db.transaction(async (trx) => {
      movie.useTransaction(trx)
      // Associate current user to movie
      await movie.related('users').attach({
        [userId]: {
          watch_status: watchStatus,
        },
      })
    })
  }

  async updateWatchStatus(movieId: string, userId: number, watchStatus: WatchStatus) {
    db.transaction(async (trx) => {
      const movie = await Movie.findOrFail(movieId, { client: trx })
      await movie.related('users').sync({
        [userId]: {
          watch_status: watchStatus,
        },
      })
    })
  }
}
