import { MutationResolvers } from 'types/resolvers-types';
import jsonwebtoken from 'jsonwebtoken'

export const loginByToken: MutationResolvers['loginByToken'] = (
  _,
  args,
  context
) => {
  const { req } = context;
  const token = jsonwebtoken.decode(req.cookies.token ?? '');
  console.log({ token });

  return {
    __typename: 'loginByTokenError',
    params: {
      ok: false,
      status: 400,
    },
  };
};
