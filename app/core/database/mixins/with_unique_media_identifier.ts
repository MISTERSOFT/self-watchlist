import { KnexCreateTableBuilder } from '#types/database'
import type { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import type { BaseModel } from '@adonisjs/lucid/orm'

import { beforeCreate, column } from '@adonisjs/lucid/orm'
import { nanoid } from 'nanoid'

/**
 * A mixin for media models (anime, movie, tvshow) that adds `unique_media_identifier` column.
 * The unique id is generated with 12 characters Nano ID.
 */
export const WithUniqueMediaIdentifier = <Model extends NormalizeConstructor<typeof BaseModel>>(
  superclass: Model
) => {
  class WithUniqueMediaIdentifierClass extends superclass {
    @column() declare uniqueMediaIdentifier: string

    @beforeCreate()
    static generateUniqueMediaIdenfier(model: any) {
      model.uniqueMediaIdentifier = nanoid(12)
    }
  }

  return WithUniqueMediaIdentifierClass
}

/**
 * Create `unique_media_identifier` column.
 *
 * @param table Knex.CreateTableBuilder instance
 */
export const withUniqueMediaIdentifierColumn = (table: KnexCreateTableBuilder) => {
  table.string('unique_media_identifier').unique().notNullable()
}
