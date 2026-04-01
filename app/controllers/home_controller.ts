import Anime from '#models/anime'
import MediaTransformer from '#transformers/media_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async index({ inertia }: HttpContext) {
    const animes = await Anime.all()

    return inertia.render('home', {
      medias: MediaTransformer.transform(animes),
    })
  }
}
