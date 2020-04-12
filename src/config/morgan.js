const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");

const successResponseFormat = `:remote-addr - :method :url :status - :response-time ms`;
const errorResponseFormat = `:remote-addr - :method :url :status - :response-time ms - message: :message`;

const accessLogStream = rfs.createStream("../../../logs/access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs"),
});

const successLogger = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorLogger = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: accessLogStream,
});

module.exports = {
  successLogger,
  errorLogger,
  accessLogStream,
};
