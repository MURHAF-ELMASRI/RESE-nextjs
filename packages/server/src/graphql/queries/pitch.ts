import { GraphQLID, GraphQLNonNull } from "graphql";
import { pitchQL } from "../types/pitch";
import { QueryType } from "./query";

const pitch: QueryType = {
  type: pitchQL,
  args: {
    id: new GraphQLNonNull(GraphQLID),
  },
  resolve: (_, { id }, context) => {
    return context.repositories.pitch.get(id);
  },
};

export default pitch;
