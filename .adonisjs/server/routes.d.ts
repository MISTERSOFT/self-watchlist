import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'import_myanimelist.store': { paramsTuple?: []; params?: {} }
    'medias.search': { paramsTuple?: []; params?: {} }
    'medias.add_to_watchlist': { paramsTuple?: []; params?: {} }
    'medias.update_watch_status': { paramsTuple?: []; params?: {} }
    'medias.remove_from_watchlist': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'medias.search': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'medias.search': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'import_myanimelist.store': { paramsTuple?: []; params?: {} }
    'medias.add_to_watchlist': { paramsTuple?: []; params?: {} }
    'medias.update_watch_status': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'medias.remove_from_watchlist': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}