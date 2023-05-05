import getUserByToken from 'pages/api/util/getUserByToken';
import { MutationResolvers } from 'types/resolvers-types';

export const loginByToken: MutationResolvers['loginByToken'] = async (
  _,
  args,
  context
) => {
  try {
    const user = await getUserByToken(context.req.cookies.token);
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
