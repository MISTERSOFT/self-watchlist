import type * as Types from '#graphql/generated/anilist/types'

export type MediaFieldsFragmentFragment = { __typename?: 'Media' } & Pick<
  Types.Media,
  | 'id'
  | 'idMal'
  | 'description'
  | 'meanScore'
  | 'type'
  | 'status'
  | 'genres'
  | 'format'
  | 'episodes'
  | 'season'
  | 'seasonYear'
  | 'isAdult'
  | 'duration'
  | 'bannerImage'
> & {
    title?: Types.Maybe<
      { __typename?: 'MediaTitle' } & Pick<Types.MediaTitle, 'english' | 'romaji' | 'native'>
    >
    startDate?: Types.Maybe<
      { __typename?: 'FuzzyDate' } & Pick<Types.FuzzyDate, 'year' | 'month' | 'day'>
    >
    endDate?: Types.Maybe<
      { __typename?: 'FuzzyDate' } & Pick<Types.FuzzyDate, 'year' | 'month' | 'day'>
    >
    coverImage?: Types.Maybe<
      { __typename?: 'MediaCoverImage' } & Pick<
        Types.MediaCoverImage,
        'extraLarge' | 'large' | 'medium'
      >
    >
    airingSchedule?: Types.Maybe<
      { __typename?: 'AiringScheduleConnection' } & {
        nodes?: Types.Maybe<
          Array<
            Types.Maybe<
              { __typename?: 'AiringSchedule' } & Pick<
                Types.AiringSchedule,
                'airingAt' | 'episode' | 'timeUntilAiring'
              >
            >
          >
        >
      }
    >
    trailer?: Types.Maybe<{ __typename?: 'MediaTrailer' } & Pick<Types.MediaTrailer, 'site' | 'id'>>
    relations?: Types.Maybe<
      { __typename?: 'MediaConnection' } & {
        edges?: Types.Maybe<
          Array<
            Types.Maybe<
              { __typename?: 'MediaEdge' } & Pick<Types.MediaEdge, 'relationType'> & {
                  node?: Types.Maybe<
                    { __typename?: 'Media' } & Pick<Types.Media, 'id' | 'idMal' | 'type'> & {
                        title?: Types.Maybe<
                          { __typename?: 'MediaTitle' } & Pick<Types.MediaTitle, 'romaji'>
                        >
                      }
                  >
                }
            >
          >
        >
      }
    >
    recommendations?: Types.Maybe<
      { __typename?: 'RecommendationConnection' } & {
        edges?: Types.Maybe<
          Array<
            Types.Maybe<
              { __typename?: 'RecommendationEdge' } & {
                node?: Types.Maybe<
                  { __typename?: 'Recommendation' } & {
                    mediaRecommendation?: Types.Maybe<
                      { __typename?: 'Media' } & Pick<Types.Media, 'id' | 'idMal' | 'type'> & {
                          title?: Types.Maybe<
                            { __typename?: 'MediaTitle' } & Pick<Types.MediaTitle, 'romaji'>
                          >
                        }
                    >
                  }
                >
              }
            >
          >
        >
      }
    >
  }

export type GetByMediaIdQueryVariables = Types.Exact<{
  mediaId: Types.Scalars['Int']['input']
}>

export type GetByMediaIdQuery = {
  Page?: Types.Maybe<
    { __typename?: 'Page' } & {
      media?: Types.Maybe<
        Array<
          Types.Maybe<
            { __typename?: 'Media' } & Pick<
              Types.Media,
              | 'id'
              | 'idMal'
              | 'description'
              | 'meanScore'
              | 'type'
              | 'status'
              | 'genres'
              | 'format'
              | 'episodes'
              | 'season'
              | 'seasonYear'
              | 'isAdult'
              | 'duration'
              | 'bannerImage'
            > & {
                title?: Types.Maybe<
                  { __typename?: 'MediaTitle' } & Pick<
                    Types.MediaTitle,
                    'english' | 'romaji' | 'native'
                  >
                >
                startDate?: Types.Maybe<
                  { __typename?: 'FuzzyDate' } & Pick<Types.FuzzyDate, 'year' | 'month' | 'day'>
                >
                endDate?: Types.Maybe<
                  { __typename?: 'FuzzyDate' } & Pick<Types.FuzzyDate, 'year' | 'month' | 'day'>
                >
                coverImage?: Types.Maybe<
                  { __typename?: 'MediaCoverImage' } & Pick<
                    Types.MediaCoverImage,
                    'extraLarge' | 'large' | 'medium'
                  >
                >
                airingSchedule?: Types.Maybe<
                  { __typename?: 'AiringScheduleConnection' } & {
                    nodes?: Types.Maybe<
                      Array<
                        Types.Maybe<
                          { __typename?: 'AiringSchedule' } & Pick<
                            Types.AiringSchedule,
                            'airingAt' | 'episode' | 'timeUntilAiring'
                          >
                        >
                      >
                    >
                  }
                >
                trailer?: Types.Maybe<
                  { __typename?: 'MediaTrailer' } & Pick<Types.MediaTrailer, 'site' | 'id'>
                >
                relations?: Types.Maybe<
                  { __typename?: 'MediaConnection' } & {
                    edges?: Types.Maybe<
                      Array<
                        Types.Maybe<
                          { __typename?: 'MediaEdge' } & Pick<Types.MediaEdge, 'relationType'> & {
                              node?: Types.Maybe<
                                { __typename?: 'Media' } & Pick<
                                  Types.Media,
                                  'id' | 'idMal' | 'type'
                                > & {
                                    title?: Types.Maybe<
                                      { __typename?: 'MediaTitle' } & Pick<
                                        Types.MediaTitle,
                                        'romaji'
                                      >
                                    >
                                  }
                              >
                            }
                        >
                      >
                    >
                  }
                >
                recommendations?: Types.Maybe<
                  { __typename?: 'RecommendationConnection' } & {
                    edges?: Types.Maybe<
                      Array<
                        Types.Maybe<
                          { __typename?: 'RecommendationEdge' } & {
                            node?: Types.Maybe<
                              { __typename?: 'Recommendation' } & {
                                mediaRecommendation?: Types.Maybe<
                                  { __typename?: 'Media' } & Pick<
                                    Types.Media,
                                    'id' | 'idMal' | 'type'
                                  > & {
                                      title?: Types.Maybe<
                                        { __typename?: 'MediaTitle' } & Pick<
                                          Types.MediaTitle,
                                          'romaji'
                                        >
                                      >
                                    }
                                >
                              }
                            >
                          }
                        >
                      >
                    >
                  }
                >
              }
          >
        >
      >
    }
  >
}

export type SearchQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']['input']>
  type?: Types.InputMaybe<Types.MediaType>
  isAdult?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
  sort?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.MediaSort>> | Types.InputMaybe<Types.MediaSort>
  >
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>
  statusIn?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.MediaStatus>> | Types.InputMaybe<Types.MediaStatus>
  >
  formatIn?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.MediaFormat>> | Types.InputMaybe<Types.MediaFormat>
  >
  idMalNot?: Types.InputMaybe<Types.Scalars['Int']['input']>
  idMalIn?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.Scalars['Int']['input']>>
    | Types.InputMaybe<Types.Scalars['Int']['input']>
  >
  idNotIn?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.Scalars['Int']['input']>>
    | Types.InputMaybe<Types.Scalars['Int']['input']>
  >
}>

export type SearchQuery = {
  Page?: Types.Maybe<
    { __typename?: 'Page' } & {
      pageInfo?: Types.Maybe<
        { __typename?: 'PageInfo' } & Pick<
          Types.PageInfo,
          'total' | 'perPage' | 'currentPage' | 'lastPage' | 'hasNextPage'
        >
      >
      media?: Types.Maybe<
        Array<
          Types.Maybe<
            { __typename?: 'Media' } & Pick<
              Types.Media,
              | 'id'
              | 'idMal'
              | 'description'
              | 'meanScore'
              | 'type'
              | 'status'
              | 'genres'
              | 'format'
              | 'episodes'
              | 'season'
              | 'seasonYear'
              | 'isAdult'
              | 'duration'
              | 'bannerImage'
            > & {
                title?: Types.Maybe<
                  { __typename?: 'MediaTitle' } & Pick<
                    Types.MediaTitle,
                    'english' | 'romaji' | 'native'
                  >
                >
                startDate?: Types.Maybe<
                  { __typename?: 'FuzzyDate' } & Pick<Types.FuzzyDate, 'year' | 'month' | 'day'>
                >
                endDate?: Types.Maybe<
                  { __typename?: 'FuzzyDate' } & Pick<Types.FuzzyDate, 'year' | 'month' | 'day'>
                >
                coverImage?: Types.Maybe<
                  { __typename?: 'MediaCoverImage' } & Pick<
                    Types.MediaCoverImage,
                    'extraLarge' | 'large' | 'medium'
                  >
                >
                airingSchedule?: Types.Maybe<
                  { __typename?: 'AiringScheduleConnection' } & {
                    nodes?: Types.Maybe<
                      Array<
                        Types.Maybe<
                          { __typename?: 'AiringSchedule' } & Pick<
                            Types.AiringSchedule,
                            'airingAt' | 'episode' | 'timeUntilAiring'
                          >
                        >
                      >
                    >
                  }
                >
                trailer?: Types.Maybe<
                  { __typename?: 'MediaTrailer' } & Pick<Types.MediaTrailer, 'site' | 'id'>
                >
                relations?: Types.Maybe<
                  { __typename?: 'MediaConnection' } & {
                    edges?: Types.Maybe<
                      Array<
                        Types.Maybe<
                          { __typename?: 'MediaEdge' } & Pick<Types.MediaEdge, 'relationType'> & {
                              node?: Types.Maybe<
                                { __typename?: 'Media' } & Pick<
                                  Types.Media,
                                  'id' | 'idMal' | 'type'
                                > & {
                                    title?: Types.Maybe<
                                      { __typename?: 'MediaTitle' } & Pick<
                                        Types.MediaTitle,
                                        'romaji'
                                      >
                                    >
                                  }
                              >
                            }
                        >
                      >
                    >
                  }
                >
                recommendations?: Types.Maybe<
                  { __typename?: 'RecommendationConnection' } & {
                    edges?: Types.Maybe<
                      Array<
                        Types.Maybe<
                          { __typename?: 'RecommendationEdge' } & {
                            node?: Types.Maybe<
                              { __typename?: 'Recommendation' } & {
                                mediaRecommendation?: Types.Maybe<
                                  { __typename?: 'Media' } & Pick<
                                    Types.Media,
                                    'id' | 'idMal' | 'type'
                                  > & {
                                      title?: Types.Maybe<
                                        { __typename?: 'MediaTitle' } & Pick<
                                          Types.MediaTitle,
                                          'romaji'
                                        >
                                      >
                                    }
                                >
                              }
                            >
                          }
                        >
                      >
                    >
                  }
                >
              }
          >
        >
      >
    }
  >
}
