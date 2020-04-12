const express = require("express");

const validate = require("../../middlewares/validate");
const validations = require("../../validations");

const { userController } = require("../../controllers");

const router = express.Router();

router
  .route("/signup")
  .post(
    validate(validations.userValidation.createUser),
    userController.createUser
  );

router.post(
  "/login",
  validate(validations.userValidation.login),
  userController.login
);

router.post(
  "/refreshToken",
  validate(validations.userValidation.refreshTokens),
  userController.refreshTokens
);

module.exports = router;
