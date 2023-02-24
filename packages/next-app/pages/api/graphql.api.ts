import { query } from '@rese/database/query/query';
import bcrypt from 'bcrypt';
import { createSchema, createYoga } from 'graphql-yoga';
import { generateSchema, schema } from 'graphql/generateSchema';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resolvers, UserStatus } from 'types/resolvers-types';
import { loginSchema } from '../../graphql/schema/Mutation/login';

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
      try {
        const { email, password } = args;
        const { res } = context;
        if (!email || !password) {
          console.log('new');
          throw new Error();
        }
        console.log('34');

        const data = await query.getUser({ email });
        console.log({ data });
        if (!data) {
          console.log(data);
          return {
            __typename: 'LoginError',
            email: 'email not found',
          };
        }

        const match = await bcrypt.compare(password, data.password);
        if (!match) {
          return {
            __typename: 'LoginError',
            password: 'password is not correct',
          };
        }

        const token = jwt.sign(
          { id: data.id },
          process.env.JWT_SECRET ?? 'secret',
          {
            expiresIn: '1w',
          }
        );

        const one_week = 60 * 60 * 24 * 7;
        res.setHeader(
          'Set-Cookie',
          `token=${token};Max-Age=${one_week};path=/`
        );

        return {
          __typename: 'User',
          email: data.email,
          id: 23,
          fullName: data.fullName,
          phone: data.phone,
          status: UserStatus.Active,
          token,
        };
      } catch {
        return {
          __typename: 'LoginError',
        };
      }
    },
    
  },
};

export default createYoga<Context>({
  graphqlEndpoint: '/api/graphql',
  schema: createSchema({
    typeDefs: generateSchema(),
    resolvers,
  }),
});
