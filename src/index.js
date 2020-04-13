/* eslint-disable no-console */
const mongoose = require("mongoose");
const chalk = require("chalk");
const app = require("./app");
const config = require("./config/config");

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log(chalk.green("MongoDB connected..."));
  server = app.listen(config.port, () => {
    console.log(chalk.green(`Server started, listening port ${config.port}`));
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log(chalk.green("Server closed"));
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(chalk.red(error));
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
