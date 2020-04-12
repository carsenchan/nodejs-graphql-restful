const express = require("express");

const auth = require("../../middlewares/auth");

const router = express.Router();

router.route("/").get(auth, (req, res) => {
  res.send({ post: [1, 2, 3] });
});

module.exports = router;
