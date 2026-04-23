import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { execSync } from 'node:child_process'

export default class QuickFresh extends BaseCommand {
  static commandName = 'quick:fresh'
  static description = 'Wipe and migrate database then seeds and scrap data'

  static options: CommandOptions = {}

  async run() {
    try {
      this.logger.info('Wipe database...')
      execSync('node ace db:wipe', { stdio: 'inherit' })

      this.logger.info('Migrate database from zero...')
      execSync('node ace migration:run', { stdio: 'inherit' })

      this.logger.info('Seeding database...')
      execSync('node ace db:seed', { stdio: 'inherit' })

      this.logger.info('Scrapping genres...')
      execSync('node ace data:scrap:genres', { stdio: 'inherit' })
    } catch (error: unknown) {
      this.logger.error('❌ Quick fresh failed.')
    }
  }
}
