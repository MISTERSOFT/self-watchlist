import { WithTimestamps } from '#core/database/mixins/with_timestamps'
import { GenreSchema } from '#database/schema'
import { compose } from '@adonisjs/core/helpers'

export default class Genre extends compose(GenreSchema, WithTimestamps) {}
