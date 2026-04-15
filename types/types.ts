import type { SearchQuery } from '#graphql/generated/anilist/operations'

export type SearchQueryMediaArray = NonNullable<SearchQuery['Page']>['media']
export type WatchStatus = 'plan_to_watch' | 'watching' | 'completed' | 'on_hold' | 'dropped'
