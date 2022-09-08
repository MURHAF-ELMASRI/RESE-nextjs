import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql";

export const subPitchQL = new GraphQLObjectType({
  name: "subPitch",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "_id of subPitch",
    },
    pitchId: {
      type: GraphQLID,
      description:
        "id of sport facility. Facility may have more than one pitch ",
    },
  }),
});
