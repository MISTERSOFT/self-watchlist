/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  home: typeof routes['home']
  importMyanimelist: {
    store: typeof routes['import_myanimelist.store']
  }
  watchlist: {
    search: typeof routes['watchlist.search']
    add: typeof routes['watchlist.add']
    update: typeof routes['watchlist.update']
    remove: typeof routes['watchlist.remove']
  }
}
