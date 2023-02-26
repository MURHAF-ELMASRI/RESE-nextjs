import query from '@rese/database/query/query';

import { MutationResolvers, UserStatus } from 'types/resolvers-types';
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const login:MutationResolvers['login'] = async (_, args, context) => {
  try {
    const { email, password } = args;
    const { res } = context;
    if (!email || !password) {
      throw new Error();
    }
    const data = await query.getUser({ email });
    if (!data) {
      return {
        __typename: 'LoginError',
        email: 'email not found',
        params: {
          ok: false,
          status: 400,
        },
      };
    }

    const match = await bcrypt.compare(password, data.password);
    if (!match) {
      return {
        __typename: 'LoginError',
        password: 'password is not correct',
        params: {
          ok: false,
          status: 400,
        },
      };
    }

    const token = jsonwebtoken.sign(
      { id: data.id },
      process.env.JWT_SECRET ?? 'secret',
      {
        expiresIn: '1w',
      }
    );

    const one_week = 60 * 60 * 24 * 7;
    res.setHeader('Set-Cookie', `token=${token};Max-Age=${one_week};path=/`);

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
      params: {
        ok: false,
        status: 400,
      },
    };
  }
};
