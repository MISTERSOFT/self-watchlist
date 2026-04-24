import { Exception } from '@adonisjs/core/exceptions'

export default class UpdateWatchStatusFailedException extends Exception {
  static status = 500
  static code = 'E_UPDATE_WATCH_STATUS_FAILED'
  static message = 'An error occurred while attempting to update the watch status.'
}
