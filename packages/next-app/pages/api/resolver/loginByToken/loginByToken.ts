import { MutationResolvers } from 'types/resolvers-types';
import jsonwebtoken from 'jsonwebtoken';
import query from '@rese/database/query/query';

export const loginByToken: MutationResolvers['loginByToken'] = async (
  _,
  args,
  context
) => {
  try {
    const { req } = context;
    const token = jsonwebtoken.decode(req.cookies.token ?? '');
    const { id } = token as { id: string };
    if (!id) {
      throw new Error();
    }
    const user = await query.getUserByToken(id);
    if (!user) {
      throw new Error();
    }
    return {
      __typename: 'User',
      id: user._id,
      ...user,
    };
  } catch {
    return {
      __typename: 'loginByTokenError',
      params: {
        ok: false,
        status: 400,
      },
    };
  }
};
