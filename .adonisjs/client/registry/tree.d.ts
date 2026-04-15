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
  medias: {
    search: typeof routes['medias.search']
    add: typeof routes['medias.add']
  }
}
