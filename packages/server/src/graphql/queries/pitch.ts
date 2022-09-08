import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { Context, context } from "../context/context";
import { pitchQL } from "../types/pitch";

type QueryType<Args extends string = any, TSource = any,T=any> = {
  type: GraphQLObjectType;
  args: Record<Args, any>;
  resolve: (object: TSource, args: Args, context: Context) => T;
};

const pitch: QueryType = {
  type: pitchQL,
  args: {
    id: new GraphQLNonNull(GraphQLID),
  },
  resolve: (_, { id }, context) => {
    return context.repositories.pitch.get(id);
  },
};

const a = pitch.resolve({}, "keke", context);
