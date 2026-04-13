import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  generates: {
    // Anilist.co
    './graphql/generated/anilist/types.ts': {
      schema: 'https://graphql.anilist.co',
      documents: ['graphql/features/anilist/**/*.graphql'],
      plugins: ['typescript'],
      config: {
        // Typescript config
        enumsAsTypes: true,
        // immutableTypes: true,
        useImplementingTypes: true,
        allowEnumStringTypes: true,
        useTypeImports: true,
        enumsAsConst: true,
        extractAllFieldsToTypes: true,
        omitOperationSuffix: true,
      },
    },
    './graphql/generated/anilist/operations.ts': {
      schema: 'https://graphql.anilist.co',
      documents: ['graphql/features/anilist/**/*.graphql'],
      preset: 'import-types',
      presetConfig: {
        typesPath: '#graphql/generated/anilist/types',
      },
      plugins: ['typescript-operations'],
      config: {
        preResolveTypes: false,
        skipTypeNameForRoot: true,
        useTypeImports: true,
      },
    },
    './graphql/generated/anilist/sdk.ts': {
      schema: 'https://graphql.anilist.co',
      documents: ['graphql/features/anilist/**/*.graphql'],
      preset: 'import-types',
      presetConfig: {
        typesPath: '#graphql/generated/anilist/operations',
        importTypesNamespace: 'OperationTypes',
      },
      plugins: ['typescript-generic-sdk'],
      config: {
        useTypeImports: true,
      },
      hooks: {
        afterOneFileWrite: [
          `sed -i "s|import gql from 'graphql-tag'|import { gql } from 'graphql-tag'|"`,
        ],
      },
    },
  },
}

export default config
