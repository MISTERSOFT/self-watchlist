import type Genre from '#models/genre'
import Tvshow from '#models/tvshow'
import type { WatchStatus } from '#types/types'
import db from '@adonisjs/lucid/services/db'

export class TvshowRepository {
  async save(tvshow: Tvshow, withGenres: Genre[]) {
    // Save in db
    return await db.transaction(async (trx) => {
      tvshow.useTransaction(trx)
      await tvshow.save()

      // Associate genres to tvshow
      await tvshow.related('genres').attach(withGenres.map((genre) => genre.id))

      return tvshow
    })
  }

  /**
   * Get user's tvshows where `watch_status` is different from `completed`.
   *
   * @param userId User id attached to tvshows
   * @param filters Filter values to apply
   * @returns User's tvshows list to watch
   */
  async getTvshowsByUser(userId: number, filters: { watchStatus: WatchStatus }) {
    const tvshows = await Tvshow.query().andWhereHas('users', (queryUsers) => {
      queryUsers.where('user_id', userId).where('watch_status', '=', filters.watchStatus)
    })

    return tvshows
  }

  async getByIdAndByUser(id: string, userId: number) {
    const tvshow = await Tvshow.query()
      .where('id', id)
      .andWhereHas('users', (query) => {
        query.where('user_id', userId)
      })
      .preload('genres')
      .preload('users', (query) => {
        query.pivotColumns(['watch_status'])
      })
      .firstOrFail()

    return tvshow
  }

  /**
   * Get tvshows by user.
   *
   * @param userId User id attached to tvshow
   * @returns User's tvshow list
   */
  async getAllByUser(userId: number) {
    const tvshows = await Tvshow.query().andWhereHas('users', (queryUsers) => {
      queryUsers.where('user_id', userId)
    })

    return tvshows
  }

  async addToUserWatchlist(tvshow: Tvshow, userId: number, watchStatus: WatchStatus) {
    // Save in db
    await db.transaction(async (trx) => {
      tvshow.useTransaction(trx)
      // Associate current user to tvshow
      await tvshow.related('users').attach({
        [userId]: {
          watch_status: watchStatus,
        },
      })
    })
  }

  /**
   * Synchronize watch status of the user's tvshow.
   *
   * @param tvshowId Tvshow id
   * @param userId User id
   * @param watchStatus New watch status value
   */
  async updateWatchStatus(tvshowId: string, userId: number, watchStatus: WatchStatus) {
    await db.transaction(async (trx) => {
      const tvshow = await Tvshow.findOrFail(tvshowId, { client: trx })
      await tvshow.related('users').sync({
        [userId]: {
          watch_status: watchStatus,
        },
      })
    })
  }

  /**
   * Detach user from tvshow.
   *
   * @param tvshowId Tvshow ID
   * @param userId User ID
   */
  async detachUser(tvshowId: string, userId: number) {
    await db.transaction(async (trx) => {
      const tvshow = await Tvshow.findOrFail(tvshowId, { client: trx })
      await tvshow.related('users').detach([userId], trx)
    })
  }

  /**
   * Synchronize watch status of the user's tvshow.
   *
   * @param tvshowId TVShow id
   * @param userId User id
   * @param watchStatus New watch status value
   */
  async updateUserWatchStatus(tvshowId: string, userId: number, watchStatus: WatchStatus) {
    await db.transaction(async (trx) => {
      const tvshow = await Tvshow.findOrFail(tvshowId, { client: trx })
      await tvshow.related('users').sync({
        [userId]: {
          watch_status: watchStatus,
        },
      })
    })
  }
}
