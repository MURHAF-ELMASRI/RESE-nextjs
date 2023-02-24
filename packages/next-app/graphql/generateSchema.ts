import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path';

export const generateSchema = () => {
  const typesArray = loadFilesSync([
    path.join(process.cwd(), 'graphql/**/*.graphql'),
  ]);
  const typeDefs = mergeTypeDefs(typesArray);
  return typeDefs;
};
