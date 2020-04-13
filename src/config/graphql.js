const { ApolloServer } = require("apollo-server-express");
// const passport = require("passport");
const schema = require("../graphql");
// const AppError = require("../utilis/appError");

// const HEADER_NAME = "authorization";

const graphQLServer = new ApolloServer({
  schema,
});

const graphqlSetup = (app) => {
  graphQLServer.applyMiddleware({
    app,
    cors: {
      origin: true,
      credentials: true,
      methods: ["POST"],
      allowedHeaders: [
        "X-Requested-With",
        "X-HTTP-Method-Override",
        "Content-Type",
        "Accept",
        "Authorization",
        "Access-Control-Allow-Origin",
      ],
    },
    playground: {
      settings: {
        "editor.theme": "light",
      },
    },
  });
};

module.exports = graphqlSetup;
