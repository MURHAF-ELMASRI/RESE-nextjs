import { query } from '@rese/database/query/query';
import bcrypt from 'bcrypt';
import { createSchema, createYoga } from 'graphql-yoga';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resolvers } from 'types/resolvers-types';
import { loginSchema } from '../../graphql/schema/login';

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
          throw new Error();
        }

        const data = await query.getUser({ email });
        if (!data) {
          return {
            __typename: 'loginError',
            email: 'email not found',
          };
        }
        
        const match = await bcrypt.compare(password, data.password);
        if (!match) {
          return {
            __typename: 'loginError',
            password: 'password is not correct',
          };
        }

        const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
          expiresIn: '1w',
        });

        const one_week = 60 * 60 * 24 * 7;
        res.setHeader('set-cookie', `token=${token};Max-Age=${one_week}`);

        return {
          __typename: 'User',
          fullName: data.fullName,
          id: data.id,
        };
      } catch (e: any) {
        console.log(e.message);
        return {
          __typename: 'loginError',
        };
      }
    },
  },
};

export default createYoga<Context>({
  graphqlEndpoint: '/api/graphql',
  schema: createSchema({
    typeDefs: loginSchema,
    resolvers,
  }),
});
