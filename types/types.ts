import type { SearchQuery } from '#graphql/generated/anilist/operations'

export type SearchQueryMediaArray = NonNullable<SearchQuery['Page']>['media']
export type SearchQueryMediaItem = NonNullable<
  NonNullable<NonNullable<SearchQuery['Page']>['media']>
>[number]
export type WatchStatus = 'plan_to_watch' | 'watching' | 'completed' | 'on_hold' | 'dropped'
