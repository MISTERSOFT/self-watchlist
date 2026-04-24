/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'import_myanimelist.store': {
    methods: ["POST"],
    pattern: '/api/import/mal',
    tokens: [{"old":"/api/import/mal","type":0,"val":"api","end":""},{"old":"/api/import/mal","type":0,"val":"import","end":""},{"old":"/api/import/mal","type":0,"val":"mal","end":""}],
    types: placeholder as Registry['import_myanimelist.store']['types'],
  },
  'watchlist.search': {
    methods: ["GET","HEAD"],
    pattern: '/api/watchlist/search',
    tokens: [{"old":"/api/watchlist/search","type":0,"val":"api","end":""},{"old":"/api/watchlist/search","type":0,"val":"watchlist","end":""},{"old":"/api/watchlist/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['watchlist.search']['types'],
  },
  'watchlist.add': {
    methods: ["POST"],
    pattern: '/api/watchlist/add',
    tokens: [{"old":"/api/watchlist/add","type":0,"val":"api","end":""},{"old":"/api/watchlist/add","type":0,"val":"watchlist","end":""},{"old":"/api/watchlist/add","type":0,"val":"add","end":""}],
    types: placeholder as Registry['watchlist.add']['types'],
  },
  'watchlist.update': {
    methods: ["POST"],
    pattern: '/api/watchlist/update',
    tokens: [{"old":"/api/watchlist/update","type":0,"val":"api","end":""},{"old":"/api/watchlist/update","type":0,"val":"watchlist","end":""},{"old":"/api/watchlist/update","type":0,"val":"update","end":""}],
    types: placeholder as Registry['watchlist.update']['types'],
  },
  'watchlist.remove': {
    methods: ["DELETE"],
    pattern: '/api/watchlist/remove',
    tokens: [{"old":"/api/watchlist/remove","type":0,"val":"api","end":""},{"old":"/api/watchlist/remove","type":0,"val":"watchlist","end":""},{"old":"/api/watchlist/remove","type":0,"val":"remove","end":""}],
    types: placeholder as Registry['watchlist.remove']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
