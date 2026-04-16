import { AnimesService } from '#services/animes_service'
import AnimeDetailTransformer from '#transformers/anime_detail_transformer'
import MediaTransformer from '#transformers/media_transformer'
import { WatchStatus } from '#types/types'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class HomeController {
  constructor(private readonly _animesService: AnimesService) {}

  async index({ inertia, auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const mediaId = request.input('mediaId', null)

    return inertia.render('home', {
      medias: async () => {
        const animes = await this._animesService.getAnimesToWatchByUser(user.id)
        return MediaTransformer.transform(animes)
      },
      selectedMedia: async () => {
        if (!mediaId) {
          return undefined
        }
        const selectedMedia = await this._animesService.getByIdByUser(+mediaId, user.id)
        return AnimeDetailTransformer.transform(selectedMedia)
      },
      watchStatuses: inertia.optional(
        () => ['plan_to_watch', 'watching', 'completed', 'on_hold', 'dropped'] as WatchStatus[]
      ),
    })
  }
}
