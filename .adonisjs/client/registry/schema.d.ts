/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'new_account.create': {
    methods: ["GET","HEAD"]
    pattern: '/signup'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
    }
  }
  'new_account.store': {
    methods: ["POST"]
    pattern: '/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'session.create': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
    }
  }
  'session.store': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
    }
  }
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/home_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/home_controller').default['index']>>>
    }
  }
  'session.destroy': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
    }
  }
  'import_myanimelist.store': {
    methods: ["POST"]
    pattern: '/api/import/mal'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/import_myanimelist_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/import_myanimelist_controller').default['store']>>>
    }
  }
  'watchlist.search': {
    methods: ["GET","HEAD"]
    pattern: '/api/watchlist/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/media').searchNewMediaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/watchlist_controller').default['search']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/watchlist_controller').default['search']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'watchlist.add': {
    methods: ["POST"]
    pattern: '/api/watchlist/add'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/media').addNewMediaValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/media').addNewMediaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/watchlist_controller').default['add']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/watchlist_controller').default['add']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'watchlist.update': {
    methods: ["POST"]
    pattern: '/api/watchlist/update'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/media').updateUserMediaValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/media').updateUserMediaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/watchlist_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/watchlist_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'watchlist.remove': {
    methods: ["DELETE"]
    pattern: '/api/watchlist/remove'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/media').deleteUserMediaValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/media').deleteUserMediaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/watchlist_controller').default['remove']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/watchlist_controller').default['remove']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
