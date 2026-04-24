import type { LucidRow, ModelAttributes } from '@adonisjs/lucid/types/model'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

/**
 * Extract ManyToMany property keys.
 *
 * @example
 * Supposing we have this property in `Anime`:
 * declare genres: ManyToMany<typeof Genre>
 *
 * ManyToManyKeys<Anime>
 * Will give: { genres: any }
 */
type ManyToManyKeys<T> = {
  [K in keyof T]: T[K] extends ManyToMany<any> ? K : never
}[keyof T]

/**
 * Extract ManyToMany properties keys with associated types.
 *
 * @example
 * Supposing we have this property in `Anime`:
 * declare genres: ManyToMany<typeof Genre>
 *
 * ManyToManyToArray<Anime>
 * Will give: { genres: Genre[] }
 */
type ManyToManyToArray<T> = {
  [K in ManyToManyKeys<T>]: T[K] extends ManyToMany<infer U> ? Array<InstanceType<U>> : never
}

/**
 * Complex type that extract all properties (attributes and relations) of a model.
 *
 * Useful when we have to pass all attributes in a method to create/update a model object.
 *
 * @example
 * ModelProperties<Anime>
 *
 * Will give: { title: string, ..., genres?: Genre[] | undefined }
 */
export type ModelProperties<TModel extends LucidRow> = Partial<ModelAttributes<TModel>> &
  Partial<ManyToManyToArray<TModel>>
