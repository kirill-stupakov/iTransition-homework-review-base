const express = require("express");
const { sequelize, Review } = require("../db");
const { Op } = require("sequelize");

const router = express.Router();

router.get("/reviews/:reviewId", (req, res) => {
  Review.findById(req.params.id)
    .then((review) => res.status(200).json(review))
    .catch((error) => res.status(500).json(error));
});

router.get(
  "/reviews/byUser/:uuid/:sortBy/:sortMode/:searchString?",
  (req, res) => {
    console.log(req.params);
    const { uuid, sortBy, sortMode, searchString } = req.params;
    let where = { authorUUID: uuid };
    if (searchString) {
      where[Op.or] = [
        { title: { [Op.substring]: searchString } },
        { body: { [Op.substring]: searchString } },
      ];
    }
    Review.findAll({
      where,
      order: [[sortBy, sortMode]],
      attributes: ["id", "category", "createdAt", "title", "rating", "mark"],
    })
      .then((review) => res.status(200).json(review))
      .catch((error) => res.status(500).json(error));
  }
);

router.post("/reviews", (req, res) => {
  res.json(req.body);
});

module.exports = router;
