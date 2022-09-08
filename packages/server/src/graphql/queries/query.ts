import { GraphQLObjectType } from "graphql";
import { Context } from "../context/context";
import { subPitchQL } from "../types/subPitch";
import pitch from "./pitch";
import pitches from "./pitches";

export type QueryType<Args extends string = any, TSource = any, T = any> = {
  type: GraphQLObjectType;
  args?: Record<Args, any>;
  resolve: (object: TSource, args: Args, context: Context) => Promise<T>;
};

export const query = new GraphQLObjectType({
  name: "Query",
  fields: (): any => ({
    // pitch,
    pitches,
  }),
});

