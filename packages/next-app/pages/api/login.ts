import { IResolvers } from '@graphql-tools/utils';
import { query } from '@rese/database/query/query';
import { createSchema, createYoga } from 'graphql-yoga';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
};

const typeDefs = `
type Query {
  greetings: String
}
type User {
  fullName: String
  id:Int
}

type loginError {
  email: String
  password: String
}

union A = User | loginError

type Mutation {
  login(email: String, password: String): A
}
`;

function createGraphqlEndpoint<Context extends Record<string, any> = {}>(
  url: string
) {
  const resolvers: IResolvers<any, Context> = {
    Query: {
      greetings: () => 'This is the `greetings` field of the root `Query` type',
    },
    Mutation: {
      login: async (_, args, context) => {
        const { email, password } = args;
        const { res } = context;
        res.setHeader('set-cookie', 'rese=hell-world');
        console.log(email);
        const data = await query.getUser({ email });
        console.log({ data });
        if (!data) {
          return { __typename: 'loginError', email: 'email not found' };
        }

        return {
          __typename: 'User',
          fullName: data.fullName,
          id: data.id,
        };
      },
    },
  };

  return createYoga<Context>({
    graphqlEndpoint: url,
    schema: createSchema({
      typeDefs,
      resolvers,
    }),
  });
}

export default createGraphqlEndpoint<Context>('/api/login');
