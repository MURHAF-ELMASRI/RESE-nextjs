import { GraphQLList, GraphQLObjectType, GraphQLType } from "graphql";
import { Context } from "../context/context";
import pitches from "./pitches";

export type ExtendedQueryType<
  Args extends string = any,
  TSource extends GraphQLType = any,
  T = any
> = {
  type: TSource | GraphQLList<TSource>;
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
