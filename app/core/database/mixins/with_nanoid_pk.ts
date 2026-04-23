import { KnexCreateTableBuilder } from '#types/database'
import type { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import type { BaseModel } from '@adonisjs/lucid/orm'

import { beforeCreate, column } from '@adonisjs/lucid/orm'
import { nanoid } from 'nanoid'

const DEFAULT_NANOID_SIZE = 21

/**
 * A mixin for media models (anime, movie, tvshow) that generate a unique 21 characters
 * Nano ID for `id` primary column.
 */
export const WithNanoIdPk = <Model extends NormalizeConstructor<typeof BaseModel>>(
  superclass: Model
) => {
  class WithNanoIdPkClass extends superclass {
    static selfAssignPrimaryKey = true
    @column({ isPrimary: true }) declare id: string

    @beforeCreate()
    static generateId(model: any) {
      model.id = nanoid(DEFAULT_NANOID_SIZE)
    }
  }

  return WithNanoIdPkClass
}

/**
 * Create `id` column.
 *
 * @param table Knex.CreateTableBuilder instance
 */
export const withNanoIdPkColumn = (table: KnexCreateTableBuilder) => {
  table.string('id', DEFAULT_NANOID_SIZE).primary()
}
