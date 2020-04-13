const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const { searchImages } = require("./mutations");
const { userQueries } = require("./queries");

const RootQuery = new GraphQLObjectType({
  name: "rootQuery",
  description:
    "This is the root query which holds all possible READ entrypoints for the GraphQL API",
  fields: () => ({
    user: userQueries,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "rootMutation",
  description: "Root mutation",
  fields: () => ({
    searchImages,
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;
