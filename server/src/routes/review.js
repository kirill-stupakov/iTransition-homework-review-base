const express = require("express");
const { Review, User, Tag, TagRelation, Rating } = require("../db");
const { Op } = require("sequelize");

const router = express.Router();

const getInfo = (review) => {
  const { id, category, title, body, mark, createdAt, imageGroupUUID } = review;
  const { uuid, name, isAdmin } = review.User;
  const author = { uuid, name, isAdmin, createdAt: review.User.createdAt };
  const tags = review.TagRelations.map((tagRelation) => tagRelation.tag);
  const rating = review.Ratings.reduce((sum, curr) => sum + curr.rating, 0);
  return {
    id,
    category,
    title,
    body,
    mark,
    createdAt,
    author,
    tags,
    rating,
    imageGroupUUID,
  };
};

const getInfoFromArray = (reviews) => reviews.map(getInfo);

router.get("/reviews/id=:id", async (req, res) => {
  const { id } = req.params;
  const review = await Review.findByPk(id, {
    include: [
      {
        model: User,
      },
      {
        model: TagRelation,
      },
      {
        model: Rating,
      },
    ],
  });
  if (!review) {
    res.status(404).json({ message: "invalid ID" });
    return;
  }

  res.status(200).json(getInfo(review));
});

router.get("/reviews/top/:attribute", async (req, res) => {
  const { attribute } = req.params;
  const reviews = await Review.findAll({
    include: [
      {
        model: User,
      },
      {
        model: TagRelation,
      },
      {
        model: Rating,
      },
    ],
    order: [[attribute, "DESC"]],
    limit: 5,
  });

  res.status(200).json(getInfoFromArray(reviews));
});

router.get(
  "/reviews/byUser/:uuid/:sortBy/:sortMode/:searchString?",
  async (req, res) => {
    const { uuid, sortBy, sortMode, searchString } = req.params;
    if (!req.user || (!req.user.isAdmin && req.user.uuid !== uuid)) {
      res.status(403).json({ message: "unauthorized" });
      return;
    }

    let where = { authorUUID: uuid };
    if (searchString) {
      where[Op.or] = [
        { title: { [Op.substring]: searchString } },
        { body: { [Op.substring]: searchString } },
      ];
    }
    const reviews = await Review.findAll({
      where,
      include: [{ model: User }, { model: TagRelation }, { model: Rating }],
      order: [[sortBy, sortMode]],
    });

    res.status(200).json(getInfoFromArray(reviews));
  }
);

router.post("/reviews", async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }
  const { authorUUID, category, title, body, mark, tags, imageGroupUUID } =
    req.body;

  if (!req.user.isAdmin && authorUUID !== req.user.uuid) {
    res.status(401).json({ message: "can't post review as another user" });
    return;
  }

  const newReview = await Review.create({
    authorUUID,
    category,
    title,
    body,
    mark,
    imageGroupUUID,
  });

  await Tag.bulkCreate(
    tags.map((tag) => ({
      name: tag,
    })),
    { ignoreDuplicates: true }
  );
  await TagRelation.bulkCreate(
    tags.map((tag) => ({ tag, reviewId: newReview.id }))
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

  await Rating.destroy({ where: { reviewId: id } });
  await TagRelation.destroy({ where: { reviewId: id } });
  await Review.destroy({ where: { id } });

  res.status(201).json({ message: "deleted successfully" });
});

router.put("/reviews/:id", async (req, res) => {
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

  const { category, title, body, mark, tags, imageGroupUUID } = req.body;

  await Review.update(
    { category, title, body, mark, imageGroupUUID },
    { where: { id } }
  );

  await Tag.bulkCreate(
    tags.map((tag) => ({
      name: tag,
    })),
    { ignoreDuplicates: true }
  );
  await TagRelation.destroy({
    where: { [Op.and]: [{ reviewId: id }, { tag: { [Op.notIn]: tags } }] },
  });
  await TagRelation.bulkCreate(
    tags.map((tag) => ({ tag, reviewId: id })),
    { ignoreDuplicates: true }
  );

  res.status(201).json({ message: "success", id });
});

router.get("/reviews/search/:searchString", async (req, res) => {
  const { searchString } = req.params;
  if (searchString.length < 3) {
    res
      .status(405)
      .json({ message: "search string should be at least 5 characters" });
    return;
  }

  const reviews = await Review.findAll({
    include: [{ model: User }, { model: TagRelation }, { model: Rating }],
    where: {
      [Op.or]: [
        { title: { [Op.substring]: searchString } },
        { body: { [Op.substring]: searchString } },
      ],
    },
    order: [["id", "DESC"]],
  });

  res.status(200).json(getInfoFromArray(reviews));
});

module.exports = router;
