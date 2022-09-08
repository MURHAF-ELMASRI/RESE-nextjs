import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
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
      type: new GraphQLNonNull(new GraphQLScalarType(GraphQLString)),
      description: "name of sport facility",
    },
    location: {
      type: new GraphQLNonNull(new GraphQLScalarType(GraphQLString)),
      description: "location of sport facility",
    },
    openAt: {
      type: new GraphQLScalarType(GraphQLInt),
      description: "open at ? hour",
    },
    closeAt: {
      type: new GraphQLScalarType(GraphQLInt),
      description: "close at ? hour",
    },
    paidServices: {
      type: new GraphQLList(
        new GraphQLNonNull(new GraphQLScalarType(GraphQLString))
      ),
      description: "list of provided paid services",
    },
    freeService: {
      type: new GraphQLList(
        new GraphQLNonNull(new GraphQLScalarType(GraphQLString))
      ),
      description: "list of provided free services",
    },
  }),
});
