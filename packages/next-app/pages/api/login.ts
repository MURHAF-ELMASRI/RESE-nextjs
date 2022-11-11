import { query } from '@rese/database/query/query';
import { createSchema, createYoga } from 'graphql-yoga';

import type { NextApiRequest, NextApiResponse } from 'next';
import { Resolvers } from 'types/resolvers-types';
import { loginSchema } from '../../graphql/login';

export const config = {
  api: {
    bodyParser: false,
  },
};

type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
};

function createGraphqlEndpoint<Context extends Record<string, any> = {}>(
  url: string
) {
  const resolvers: Resolvers = {
    Query: {
      greetings: () => 'This is the `greetings` field of the root `Query` type',
    },
    Mutation: {
      login: async (_, args, context) => {
        const { email, password } = args;
        const { res } = context;
        res.setHeader('set-cookie', 'rese=hell-world');
        const data = await query.getUser({ email });
        if (!data) {
          return {
            __typename: 'loginError',
            email: 'email not found',
            password: 'password is not correct',
            error: true,
          };
        }

        return {
          __typename: 'User',
          fullName: 'full Name',
          id: 'id',
        };
      },
    },
  };

  return createYoga<Context>({
    graphqlEndpoint: url,
    schema: createSchema({
      typeDefs: loginSchema,
      resolvers,
    }),
  });
}

export default createGraphqlEndpoint<Context>('/api/login');
