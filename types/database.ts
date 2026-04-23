import type { Knex } from 'knex'

type CreateTableParams = Parameters<Knex.SchemaBuilder['createTable']>
type CreateTableTableBuilderCallbackParams = CreateTableParams[1]
/**
 * Extracted type of `Knex.CreateTableBuilder`
 */
export type KnexCreateTableBuilder = Parameters<CreateTableTableBuilderCallbackParams>[0]
