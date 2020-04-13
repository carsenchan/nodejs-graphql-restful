const express = require("express");

const imageController = require("../../controllers/images.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.route("/search").get(auth, async (req, res, next) => {
  // res.send({ post: [1, 2, 3] });
  try {
    const { keyword } = req.query;
    const result = await imageController.searchImages(keyword);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
