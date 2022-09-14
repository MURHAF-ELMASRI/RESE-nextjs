import { GraphQLList } from "graphql";
import { pitchQL } from "../types/pitch";
import { ExtendedQueryType } from "./query"


//TODO: constrain showing pitch by location
const pitches: ExtendedQueryType = {
  type: new GraphQLList(pitchQL),
  resolve: async (_, __, context) => context.repositories.pitch.getAll(),
};

export default pitches;
