import { GraphQLID, GraphQLNonNull } from "graphql";
import { pitchQL } from "../types/pitch";
import { ExtendedQueryType } from "./query";

const pitch: ExtendedQueryType = {
  type: pitchQL,
  args: {
    id: new GraphQLNonNull(GraphQLID),
  },
  resolve: (_, { id }, context) => {
    return context.repositories.pitch.get(id);
  },
};

export default pitch;
