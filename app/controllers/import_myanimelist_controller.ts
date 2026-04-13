import { MyAnimeListImporterService } from '#services/myanimelist_importer_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

@inject()
export default class ImportMyanimelistController {
  constructor(readonly importer: MyAnimeListImporterService) {}
  async store({ request, session, response }: HttpContext) {
    const username = request.input('username')
    try {
      logger.info('[MAL import] Start')
      await this.importer.fromUsername(username)
      logger.info('[MAL import] Done')
      session.flash('success', `Liste d'anime importé avec succès depuis MyAnimeList`)
    } catch (err) {
      logger.error(err, '[MAL import] Failed')
      session.flashErrors({
        import: `An error occurred during import. Please check your MyAnimeList username and try again.`,
      })
    }
    return response.redirect().toRoute('home')
  }
}
