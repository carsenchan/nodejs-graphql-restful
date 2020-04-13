const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const http = require("http");
const passport = require("passport");
const httpStatus = require("http-status");
const { ApolloServer } = require("apollo-server-express");
const schema = require("./graphql");

const AppError = require("./utilis/appError");
const routes = require("./routes/v1");
const { errorConverter, errorHandler } = require("./middlewares/error");

// const morganLogger = require("./config/morgan");
const passportConfig = require("./config/passport");

const app = express();
const server = http.Server(app);

// morgan logger
// create a rotating write stream
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "../logs"),
});
app.use(
  morgan(
    ":method :url :status [:date[clf]] :res[content-length] - :response-time ms",
    {
      stream: accessLogStream,
    }
  )
);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", passportConfig.jwtStrategy);

// v1 api routes
app.use("/v1", routes);

// express graphql
const graphQLServer = new ApolloServer({
  schema,
});

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

// send back a 404 error for any unknown api request
app.use(function (req, res, next) {
  next(new AppError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to AppError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = server;
