import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  generates: {
    // Anilist.co
    './graphql/generated/anilist/types.ts': {
      schema: 'https://graphql.anilist.co',
      documents: ['graphql/features/anilist/**/*.graphql'],
      plugins: ['typescript', 'typescript-operations', 'typescript-generic-sdk'],
      config: {
        // Typescript config
        enumsAsTypes: true,
        immutableTypes: true,
        useImplementingTypes: true,
        allowEnumStringTypes: true,
        useTypeImports: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: [
      // Fix syntax error after generation
      `sed -i "s/import gql from 'graphql-tag'/import { gql } from 'graphql-tag'/"`,
    ],
  },
}

export default config
