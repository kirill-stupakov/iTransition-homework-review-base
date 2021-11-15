const express = require("express");
const { sequelize, Review, User } = require("../db");
const { Op } = require("sequelize");
const flichr = require("flickr-sdk");

const router = express.Router();

router.get("/reviews/id/:id", (req, res) => {
  Review.findOne({
    where: { id: req.params.id },
    attributes: [
      "authorUUID",
      "category",
      "title",
      "body",
      "mark",
      "rating",
      "createdAt",
    ],
  })
    // .then((review) => ({...review, revire.body.}))
    .then((review) => res.status(200).json(review))
    .catch((error) => res.status(500).json(error));
});

router.get("/reviews/top/:attribute", (req, res) => {
  const { attribute } = req.params;
  Review.findAll({
    include: [{ model: User }],
    attributes: [
      "id",
      "authorUUID",
      "category",
      "title",
      "mark",
      "rating",
      "createdAt",
    ],
    order: [[attribute, "DESC"]],
    limit: 10,
  })
    .then((review) => res.status(200).json(review))
    .catch((error) => res.status(500).json(error));
});

router.get(
  "/reviews/byUser/:uuid/:sortBy/:sortMode/:searchString?",
  (req, res) => {
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
      .then((reviews) => res.status(200).json(reviews))
      .catch((error) => res.status(500).json(error));
  }
);

router.post("/reviews", (req, res) => {
  console.log(res.body);
  const { review, images } = req.body;
  Review.create(review)
    .then((newReview) => {})
    .catch((error) => res.status(500).json(error));
  res.status(200).json({ msg: "success" });
});

module.exports = router;
