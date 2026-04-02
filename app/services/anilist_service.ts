import { anilist } from '#graphql/clients/anilist_client'
import type { SearchQueryVariables } from '#graphql/generated/anilist/types'

const DEFAULT_GET_ANIMES_QUERY_VARIABLES: SearchQueryVariables = {
  type: 'ANIME',
  isAdult: false,
  sort: 'POPULARITY_DESC',
  statusIn: ['FINISHED', 'RELEASING'],
  formatIn: ['TV', 'MOVIE', 'SPECIAL', 'OVA', 'ONA'],
  idMalNot: null,
  page: 1,
}

export class AnilistService {
  async search(queryVariables: Pick<SearchQueryVariables, 'search' | 'page'>) {
    return await anilist.Search({
      ...DEFAULT_GET_ANIMES_QUERY_VARIABLES,
      ...queryVariables,
    })
  }

  async getByMalId(queryVariables: Pick<SearchQueryVariables, 'idMalIn' | 'page'>) {
    return await anilist.Search({
      ...DEFAULT_GET_ANIMES_QUERY_VARIABLES,
      ...queryVariables,
    })
  }

  async getGenres() {
    return await anilist.GetGenres()
  }
}
