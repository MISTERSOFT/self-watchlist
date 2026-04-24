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
    'watchlist.search': { paramsTuple?: []; params?: {} }
    'watchlist.add': { paramsTuple?: []; params?: {} }
    'watchlist.update': { paramsTuple?: []; params?: {} }
    'watchlist.remove': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'watchlist.search': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'watchlist.search': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'import_myanimelist.store': { paramsTuple?: []; params?: {} }
    'watchlist.add': { paramsTuple?: []; params?: {} }
    'watchlist.update': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'watchlist.remove': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}