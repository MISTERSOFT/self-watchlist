import type { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import type { BaseModel } from '@adonisjs/lucid/orm'
import type { DateTime } from 'luxon'

import { KnexCreateTableBuilder } from '#types/database'
import { column } from '@adonisjs/lucid/orm'

/**
 * A mixin for models that adds `createdAt` and `updatedAt` columns
 */
export const WithTimestamps = <Model extends NormalizeConstructor<typeof BaseModel>>(
  superclass: Model
) => {
  class WithTimestampsClass extends superclass {
    @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
    @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime
  }

  return WithTimestampsClass
}

/**
 * Create timestamps with time zone columns (`created_at`, `updated_at`).
 *
 * @param table Knex.CreateTableBuilder instance
 */
export const withTimestampsTzColumns = (table: KnexCreateTableBuilder) => {
  table.timestamp('created_at', { useTz: true }).notNullable()
  table.timestamp('updated_at', { useTz: true }).notNullable()
}
