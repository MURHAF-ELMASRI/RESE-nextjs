import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";

export const newPitch = new GraphQLInputObjectType({
  name: "NewPitch",
  fields: {
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
  },
});

