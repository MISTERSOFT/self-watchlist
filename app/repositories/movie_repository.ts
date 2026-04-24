// https://docs.adonisjs.com/guides/concepts/scaffolding#creating-stubs

import Movie from '#models/movie'
import type { WatchStatus } from '#types/types'
import db from '@adonisjs/lucid/services/db'

export class MovieRepository {
  /**
   * Detach user from movie.
   *
   * @param movieId Movie ID
   * @param userId User ID
   */
  async detachUser(movieId: string, userId: number) {
    await db.transaction(async (trx) => {
      const movie = await Movie.findOrFail(movieId, { client: trx })
      await movie.related('users').detach([userId], trx)
    })
  }

  /**
   * Synchronize watch status of the user's movie.
   *
   * @param movieId Movie id
   * @param userId User id
   * @param watchStatus New watch status value
   */
  async updateWatchStatus(movieId: string, userId: number, watchStatus: WatchStatus) {
    await db.transaction(async (trx) => {
      const movie = await Movie.findOrFail(movieId, { client: trx })
      await movie.related('users').sync({
        [userId]: {
          watch_status: watchStatus,
        },
      })
    })
  }
}
