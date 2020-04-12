const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");

const morgan = require("./config/morgan");
const passportConfig = require("./config/passport");

const app = express();

app.use(morgan.successLogger);
app.use(morgan.errorLogger);

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

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new AppError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;
