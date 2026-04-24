import { TvshowRepository } from '#repositories/tvshow_repository'
import { inject } from '@adonisjs/core'

@inject()
export class TvShowsService {
  constructor(private readonly _tvshowRepository: TvshowRepository) {}

  /**
   * Get user's TMDB tvshow ids.
   *
   * @param userId User id attached to tvshow
   * @returns User's TMDB tvshow ids list
   */
  async getTvShowsTMDBIdsByUser(userId: number) {
    // const tvshows = await Tvshow.query()
    //   .select('external_source_id')
    //   .andWhereHas('users', (queryUsers) => {
    //     queryUsers.where('user_id', userId)
    //   })
    const tvshows = await this._tvshowRepository.getAllByUser(userId)

    return tvshows.map((tvshow) => +tvshow.externalSourceId!)
  }
}
