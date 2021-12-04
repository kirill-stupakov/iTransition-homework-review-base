const express = require("express");
const { sequelize, Rating, Review } = require("../db");

const router = express.Router();

router.put("/rating/:reviewId/:rating", async (req, res) => {
  if (!req.user) {
    res.status(403).json({ message: "unauthorized" });
    return;
  }

  const userUUID = req.user.uuid;
  const { reviewId, rating } = req.params;
  await Rating.upsert(
    { userUUID, reviewId, rating },
    { where: { reviewId, userUUID } }
  );

  const newRating = await Rating.sum("rating", { where: { reviewId } });
  await Review.update(
    {
      rating: newRating,
    },
    {
      where: {
        id: reviewId,
      },
    }
  );

  res.status(201).json({ message: "rating updated successfully" });
});

router.get("/rating/:reviewId", async (req, res) => {
  if (!req.user) {
    res.status(403).json({ message: "unauthorized" });
    return;
  }
  const userUUID = req.user.uuid;
  const { reviewId } = req.params;
  const rating = await Rating.findOne({ where: { userUUID, reviewId } });
  res.status(200).json({ rating: rating ? rating.rating : 0 });
});

module.exports = router;
