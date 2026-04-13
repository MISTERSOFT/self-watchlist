import type * as OperationTypes from '#graphql/generated/anilist/operations'

import type { DocumentNode } from 'graphql'
import { gql } from 'graphql-tag'

export const SearchDocument = gql`
  query Search(
    $search: String
    $type: MediaType
    $isAdult: Boolean
    $sort: [MediaSort]
    $page: Int
    $statusIn: [MediaStatus]
    $formatIn: [MediaFormat]
    $idMalNot: Int
    $idMalIn: [Int]
  ) {
    Page(page: $page) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(
        search: $search
        type: $type
        isAdult: $isAdult
        sort: $sort
        status_in: $statusIn
        format_in: $formatIn
        idMal_not: $idMalNot
        idMal_in: $idMalIn
      ) {
        id
        idMal
        title {
          english
          romaji
          native
        }
        description
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        meanScore
        type
        status
        genres
        format
        episodes
        coverImage {
          extraLarge
          large
          medium
        }
        season
        seasonYear
        airingSchedule {
          nodes {
            airingAt
            episode
            timeUntilAiring
          }
        }
        isAdult
        trailer {
          site
          id
        }
        duration
        bannerImage
        relations {
          edges {
            relationType
            node {
              id
              idMal
              title {
                romaji
              }
              type
            }
          }
        }
        recommendations {
          edges {
            node {
              mediaRecommendation {
                title {
                  romaji
                }
                id
                idMal
                type
              }
            }
          }
        }
      }
    }
  }
`
export type Requester<C = {}> = <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: C
) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    Search(
      variables?: OperationTypes.SearchQueryVariables,
      options?: C
    ): Promise<OperationTypes.SearchQuery> {
      return requester<OperationTypes.SearchQuery, OperationTypes.SearchQueryVariables>(
        SearchDocument,
        variables,
        options
      ) as Promise<OperationTypes.SearchQuery>
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
