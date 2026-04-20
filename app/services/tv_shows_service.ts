import Tvshow from '#models/tvshow'

export class TvShowsService {
  /**
   * Get user's TMDB tvshow ids.
   *
   * @param userId User id attached to tvshow
   * @returns User's TMDB tvshow ids list
   */
  async getTvShowsTMDBIdsByUser(userId: number) {
    const tvshows = await Tvshow.query()
      .select('external_source_id')
      .andWhereHas('users', (queryUsers) => {
        queryUsers.where('user_id', userId)
      })

    return tvshows.map((tvshow) => +tvshow.externalSourceId!)
  }
}
