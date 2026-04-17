import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { join } from 'node:path'

const STUBS_ROOT = join(import.meta.dirname, '../stubs')
const STUB_PATH = 'make/react/component.stub'

export default class MakeReactComponent extends BaseCommand {
  static commandName = 'make:react:component'
  static description = 'Create a new React component'

  static options: CommandOptions = {
    startApp: false,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  static help?: string | string[] | undefined = [
    'This command create a new React component inside the Inertia folder (inertia/components).',
  ]

  @args.string({ description: 'Component name', required: true })
  declare name: string

  async run() {
    await this._generateFile()
  }

  async completed() {
    if (this.error) {
      /**
       * Handle the error from any lifecycle method
       */
      this.logger.error(this.error.message)

      /**
       * Return true to notify Ace that you've handled the error
       * This prevents Ace from logging the error again
       */
      return true
    }
  }

  /**
   * Generate component file
   */
  private async _generateFile() {
    this.logger.info(`Creating "${this.name}" component...`)
    const codemods = await this.createCodemods()
    await codemods.makeUsingStub(STUBS_ROOT, STUB_PATH, {
      name: this.name,
    })
  }
}
