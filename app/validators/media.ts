import vine from '@vinejs/vine'

const mediaTypeSchema = vine.enum(['anime', 'movie', 'tvshow'])

export const searchNewMediaValidator = vine.create({
  search: vine.string().minLength(3),
  type: mediaTypeSchema,
})

export const addNewMediaValidator = vine.create({
  externalSourceId: vine.string().transform((id) => +id),
  type: mediaTypeSchema,
})

export const deleteUserMediaValidator = vine.create({
  mediaId: vine.number(),
  type: mediaTypeSchema,
})

export const updateUserMediaValidator = vine.create({
  mediaId: vine.number(),
  type: mediaTypeSchema,
  watchStatus: vine.enum(['completed', 'dropped', 'on_hold', 'plan_to_watch', 'watching']),
})
