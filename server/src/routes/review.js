const express = require("express");
const { sequelize, Review } = require("../db");

const router = express.Router();

router.get("/reviews/:reviewId", (req, res) => {
  Review.findById(req.params.id).then((review) => res.json(review));
});

module.exports = router;
