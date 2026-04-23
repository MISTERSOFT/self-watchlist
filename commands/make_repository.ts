import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { join } from 'node:path'

const STUBS_ROOT = join(import.meta.dirname, '../stubs')
const STUB_PATH = 'make/repository.stub'

export default class MakeRepository extends BaseCommand {
  static commandName = 'make:repository'
  static description = 'Create a new repository class in app/repositories.'

  static options: CommandOptions = {}

  @args.string({ description: 'Repository name', required: true })
  declare name: string

  async run() {
    this.logger.info(`Creating "${this.name}" repository...`)
    const codemods = await this.createCodemods()
    await codemods.makeUsingStub(STUBS_ROOT, STUB_PATH, {
      name: this.name,
    })
  }
}
