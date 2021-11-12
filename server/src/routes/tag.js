const express = require("express");
const { sequelize, Tag } = require("../db");

const router = express.Router();

router.get("/tags", (req, res) => {
  Tag.findAll({ attributes: ["name", "count"] })
    .then((review) => res.status(200).json(review))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
