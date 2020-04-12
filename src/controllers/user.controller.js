const httpStatus = require("http-status");
const userServices = require("../services/user.services");
const authServices = require("../services/auth.services");

const createUser = (req, res, next) => {
  userServices
    .createUser(req.body)
    .then((newUser) => {
      res.status(httpStatus.CREATED).send(newUser.transform());
    })
    .catch((error) => next(error));
};

const getUser = (req, res, next) => {
  userServices
    .getUserById(req.params.userId)
    .then((user) => {
      res.send(user.transform());
    })
    .catch((error) => next(error));
};

const login = (req, res, next) => {
  let user;
  userServices
    .loginUser(req.body.email, req.body.password)
    .then((loginUser) => {
      user = loginUser;
      return authServices.generateAuthTokens(user.id);
    })
    .then((tokens) => {
      const responseBody = { user: user.transform(), tokens };
      res.send(responseBody);
    })
    .catch((error) => next(error));
};

const refreshTokens = (req, res, next) => {
  authServices
    .refreshAuthTokens(req.body.refreshToken)
    .then((tokens) => {
      const responseBody = { ...tokens };
      res.send(responseBody);
    })
    .catch((error) => next(error));
};

module.exports = {
  createUser,
  getUser,
  login,
  refreshTokens,
};
