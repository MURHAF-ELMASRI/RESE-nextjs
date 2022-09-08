import { GraphQLObjectType } from "graphql";
import { pitchQL } from "../types/pitch";
import { subPitchQL } from "../types/subPitch";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: (): any => ({
    pitch: pitchQL,
    subPitch: subPitchQL,
  }),
});
