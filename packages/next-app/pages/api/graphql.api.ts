import { createSchema, createYoga } from 'graphql-yoga';
import { generateSchema } from 'graphql/generateSchema';
import { resolvers } from './resolver/resolver';
import { Context } from './types';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createYoga<Context>({
  graphqlEndpoint: '/api/graphql',
  schema: createSchema({
    typeDefs: generateSchema(),
    resolvers,
  }),
});
