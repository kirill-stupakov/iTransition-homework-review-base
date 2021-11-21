const express = require("express");
const { Review, User, Tag, TagRelation } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
// const { uploadImage } = require("../uploadImage");

const router = express.Router();

router.get("/reviews/id=:id", async (req, res) => {
  let review = await Review.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["name", "uuid"],
      },
    ],
    attributes: [
      "authorUUID",
      "category",
      "title",
      "body",
      "mark",
      "rating",
      "createdAt",
    ],
  });

  if (!review) {
    res.status(404).json({ message: "invalid ID" });
    return;
  }

  review = review.get({ plain: true });

  const tags = await TagRelation.findAll({
    raw: true,
    where: { reviewId: req.params.id },
    attributes: ["tag"],
  });

  review = { ...review, tags: tags.map((tag) => tag.tag) };

  res.status(200).json(review);

  // .then((review) => ({...review, revire.body.}))
  // .then((review) => res.status(200).json(review))
  // .catch((error) => res.status(500).json(error));
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

router.post("/reviews", async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }
  const { authorUUID, category, title, body, mark, tags } = JSON.parse(
    req.files.document.data
  );
  if (!req.user.isAdmin && authorUUID !== req.user.uuid) {
    res.status(401).json({ message: "can't post review as another user" });
    return;
  }
  const newTags = tags.filter((tag) => tag.label).map((tag) => tag.label);
  const tagNames = tags.map((tag) => (tag.label ? tag.label : tag));
  const newReview = await Review.create({
    authorUUID,
    category,
    title,
    body,
    mark,
  });
  await Tag.bulkCreate(
    newTags.map((tag) => ({
      name: tag,
    }))
  );
  await TagRelation.bulkCreate(
    tagNames.map((tag) => ({ tag, reviewId: newReview.id }))
  );
  res.status(201).json({ message: "success", id: newReview.id });
});

router.delete("/reviews/:id", async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }

  const { id } = req.params;
  const review = await Review.findByPk(id, { raw: true });
  if (!review) {
    res.status(204).json({ message: "review not found" });
    return;
  }
  if (!req.user.isAdmin && review.authorUUID !== req.user.uuid) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }

  await TagRelation.destroy({ where: { reviewId: id } });
  await Review.destroy({ where: { id } });

  res.status(201).json({ message: "deleted successfully" });
});

module.exports = router;
