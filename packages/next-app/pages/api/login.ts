import { query } from '@rese/database/query/query';
import { createSchema, createYoga } from 'graphql-yoga';
import { useLoginMutation } from 'hooks/graphql/apolloHooks';

import type { NextApiRequest, NextApiResponse } from 'next';
import { Resolvers } from 'types/resolvers-types';

export const config = {
  api: {
    bodyParser: false,
  },
};

type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
};

const resolvers: Resolvers<Context> = {
  Query: {
    greetings: () => 'This is the `greetings` field of the root `Query` type',
  },
  Mutation: {
    login: async (_, args, context) => {
      const { email, password } = args;
      if (!email) {
        return {
          __typename: 'loginError',
          email: 'should be set',
          password:""
        };
      }

      console.log('herre in api ');
      const { res } = context;
      res.setHeader('set-cookie', 'rese=hell-world');

      const data = await query.getUser({ email });
      if (!data) {
        return {
          __typename: 'loginError',
          email: 'email not found',
          password: 'password is not correct',
        };
      }

      return {
        __typename: 'User',
        fullName: 'full Name',
        id: 32,
      };
    },
  },
};

const typeDefs = `
type Query {
  greetings: String
}
type User {
  fullName: String
  id: Int
}

type loginError {
  error: Boolean
  email: String
  password: String
}

union loginOrError = User | loginError

type Mutation {
  login(email: String, password: String): loginOrError
}
`;

export default createYoga<Context>({
  graphqlEndpoint: '/api/login',
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});
