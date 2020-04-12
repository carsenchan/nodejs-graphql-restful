const express = require("express");

const userRoute = require("./user.routes");
const postRoute = require("./posts.routes");

const router = express.Router();

router.use("/users", userRoute);
router.use("/posts", postRoute); // for testing bearer token

module.exports = router;
