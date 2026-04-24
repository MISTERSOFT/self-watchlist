import Anime from '#models/anime'
import Movie from '#models/movie'
import Tvshow from '#models/tvshow'
import { WatchlistService } from '#services/watchlist_service'
import AnimeDetailsTransformer from '#transformers/anime_details_transformer'
import MediaCardTransformer from '#transformers/media_card_transformer'
import MovieDetailsTransformer from '#transformers/movie_details_transformer'
import TvshowDetailsTransformer from '#transformers/tvshow_details_transformer'
import { WatchStatus } from '#types/types'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class HomeController {
  constructor(private readonly _watchlistService: WatchlistService) {}

  async index({ inertia, auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const mediaId = request.input('mediaId', null)

    return inertia.render('home', {
      medias: async () => {
        const [animes, movies, tvshows] = await this._watchlistService.getUserWatchlist(user.id)
        const all = [...animes, ...movies, ...tvshows].sort((a, b) => {
          if (a.createdAt < b.createdAt) return -1
          if (a.createdAt > b.createdAt) return 1
          return 0
        })
        return MediaCardTransformer.transform(all)
      },
      selectedMedia: async () => {
        if (!mediaId) {
          return undefined
        }
        const selectedMedia = await this._watchlistService.getUserMedia(mediaId, user.id)

        if (selectedMedia instanceof Anime) {
          return AnimeDetailsTransformer.transform(selectedMedia)
        }
        if (selectedMedia instanceof Movie) {
          return MovieDetailsTransformer.transform(selectedMedia)
        }
        if (selectedMedia instanceof Tvshow) {
          return TvshowDetailsTransformer.transform(selectedMedia)
        }
        return undefined
      },
      watchStatuses: [
        'plan_to_watch',
        'watching',
        'completed',
        'on_hold',
        'dropped',
      ] as WatchStatus[],
    })
  }
}
