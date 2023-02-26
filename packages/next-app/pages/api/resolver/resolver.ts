import { Resolvers } from 'types/resolvers-types';
import { Context } from '../types';
import jsonwebtoken from 'jsonwebtoken';

export const resolvers: Resolvers<Context> = {
  Query: {
    greetings: () => 'This is the `greetings` field of the root `Query` type',
  },
  Mutation: {
    
  },
};
