import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './packages/next-app/graphql/schema/*.ts',
  documents: './packages/next-app/features/**/*.graphql',
  generates: {
    './packages/next-app/graphql/graphql/generated/apolloHooks.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
      },
    },
    './packages/next-app/types/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
