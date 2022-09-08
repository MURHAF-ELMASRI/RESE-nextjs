import pitchRepository from "../repositories/pitchRepository";

const repositoriesContext = {
  pitch: pitchRepository,
};

//TODO add loader to here for optimization
const LoadersContext = {};

export const context = {
  repositories: repositoriesContext,
  loaders: LoadersContext,
};

export type Context = typeof context;
