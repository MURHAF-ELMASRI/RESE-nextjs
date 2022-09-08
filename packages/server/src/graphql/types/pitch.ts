import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const pitchQL = new GraphQLObjectType({
  name: "pitch",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "_id of sport facility",
    },
    mangerId: {
      type: new GraphQLNonNull(GraphQLID),
      description: "_id of manger of facility",
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "name of sport facility",
    },
    location: {
      type: new GraphQLNonNull(GraphQLString),
      description: "location of sport facility",
    },
    openAt: {
      type: GraphQLInt,
      description: "open at ? hour",
    },
    closeAt: {
      type: GraphQLInt,
      description: "close at ? hour",
    },
    paidServices: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
      description: "list of provided paid services",
    },
    freeService: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
      description: "list of provided free services",
    },
  }),
});
