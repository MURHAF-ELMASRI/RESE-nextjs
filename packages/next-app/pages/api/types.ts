import { NextApiRequest, NextApiResponse } from 'next';

export type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
};
