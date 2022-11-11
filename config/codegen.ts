import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './packages/next-app/graphql/*.ts',
  documents: './packages/next-app/pages/**/*.tsx',
  generates: {
    './test.ts': {
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
      config: {
        contextType: 'models#MyContextType',
        mappers: {
          User: './models#UserModel',
          Profile: './models#UserProfile',
        },
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
