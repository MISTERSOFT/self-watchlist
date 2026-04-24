// https://docs.adonisjs.com/guides/concepts/scaffolding#creating-stubs

import Anime from '#models/anime'
import type { WatchStatus } from '#types/types'
import db from '@adonisjs/lucid/services/db'

export class AnimeRepository {
  /**
   * Detach user from anime.
   *
   * @param animeId Anime ID
   * @param userId User ID
   */
  async detachUser(animeId: string, userId: number) {
    await db.transaction(async (trx) => {
      const anime = await Anime.findOrFail(animeId, { client: trx })
      await anime.related('users').detach([userId], trx)
    })
  }

  /**
   * Synchronize watch status of the user's anime.
   *
   * @param animeId Anime id
   * @param userId User id
   * @param watchStatus New watch status value
   */
  async updateWatchStatus(animeId: string, userId: number, watchStatus: WatchStatus) {
    await db.transaction(async (trx) => {
      const anime = await Anime.findOrFail(animeId, { client: trx })
      await anime.related('users').sync({
        [userId]: {
          watch_status: watchStatus,
        },
      })
    })
  }
}
