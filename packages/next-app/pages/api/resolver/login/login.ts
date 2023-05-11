import query from '@rese/database/query/query';

import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { MutationResolvers, User } from 'types/resolvers-types';

const TOKEN_EXPIRATION = {
  text: '1w',
  value: 60 * 60 * 24 * 7,
};

export const login: MutationResolvers['login'] = async (_, args, context) => {
  try {
    const { email, password } = args;
    const { res } = context;
    if (!email || !password) {
      throw new Error();
    }
    const data = await query.getUserByEmail({ email });
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
      { _id: data._id },
      process.env.JWT_SECRET ?? 'secret',
      {
        expiresIn: TOKEN_EXPIRATION.text,
      }
    );

    res.setHeader(
      'Set-Cookie',
      `token=${token};Max-Age=${TOKEN_EXPIRATION.value};path=/`
    );
    const user: User = {
      __typename: 'User',
      _id: data._id,
      email: data.email,
      fullName: data.fullName,
      phone: data.phone,
      status: data.status,
      type: data.type,
    };

    return user;
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
