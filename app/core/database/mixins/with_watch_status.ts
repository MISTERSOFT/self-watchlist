import type { KnexCreateTableBuilder } from '#types/database'

// No-mixin

/**
 * Create `watch_status` column.
 *
 * Possible status: plan to watch, watching, completed, on_hold, dropped
 *
 * @param table Knex.CreateTableBuilder instance
 */
export const withWatchStatusColumn = (table: KnexCreateTableBuilder) => {
  table.string('watch_status').notNullable()
}
