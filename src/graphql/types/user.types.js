const { GraphQLObjectType, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a User",
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (user) => user.id,
    },
    name: {
      type: GraphQLString,
      resolve: (user) => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (user) => user.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (user) => user.updatedAt,
    },
  }),
});

module.exports = UserType;
