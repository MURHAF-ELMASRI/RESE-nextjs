import { Resolvers } from 'types/resolvers-types';
import { Context } from '../types';
import { login } from './login/login';
import { loginByToken } from './loginByToken/loginByToken';
import { signup } from './signup/signup';
import { confirmCode } from './confirmCode/confirmCode';

export const resolvers: Resolvers<Context> = {
  Query: {
    greetings: () => 'This is the `greetings` field of the root `Query` type',
  },
  Mutation: {
    login,
    loginByToken,
    signup,
    confirmCode
  },
};
