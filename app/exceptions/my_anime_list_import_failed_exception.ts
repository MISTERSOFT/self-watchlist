import { Exception } from '@adonisjs/core/exceptions'

export default class MyAnimeListImportFailedException extends Exception {
  static status = 500
  static code = 'E_MY_ANIME_LIST_IMPORT_FAILED'
  static message = 'An error occurred while attempting to import the MyAnimeList user profile.'
}
