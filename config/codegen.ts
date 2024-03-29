import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './packages/next-app/graphql/**/*.graphql',
  documents: './packages/next-app/pages/**/*.graphql',
  generates: {
    './packages/next-app/hooks/generated/apolloHooks.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        enumsAsTypes: true,
      },
    },
    './packages/next-app/types/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
