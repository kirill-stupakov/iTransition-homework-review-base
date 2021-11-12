const express = require("express");
const { sequelize, Review } = require("../db");

const router = express.Router();

router.get("/reviews/:reviewId", (req, res) => {
  Review.findById(req.params.id)
    .then((review) => res.status(200).json(review))
    .catch((error) => res.status(500).json(error));
});

router.post("/reviews", (req, res) => {
  res.json(req.body);
});

module.exports = router;
