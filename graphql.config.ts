import type { IGraphQLConfig } from 'graphql-config'

const config: IGraphQLConfig = {
  projects: {
    anilist: {
      schema: 'https://graphql.anilist.co',
      documents: 'graphql/features/**/*.graphql',
    },
  },
}

export default config
