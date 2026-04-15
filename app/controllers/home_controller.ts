import { AnimesService } from '#services/animes_service'
import MediaTransformer from '#transformers/media_transformer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class HomeController {
  constructor(private readonly _animesService: AnimesService) {}

  async index({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const animes = await this._animesService.getAnimesToWatchByUser(user.id)

    return inertia.render('home', {
      medias: MediaTransformer.transform(animes),
    })
  }
}
