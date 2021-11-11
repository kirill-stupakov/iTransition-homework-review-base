const express = require("express");
const { sequelize, Category } = require("../db");

const router = express.Router();

router.get("/categories", (req, res) => {
  Category.findAll()
    .then((categories) => res.status(200).json(categories))
    .catch((error) => req.status(500).json(error));
});

router.post("/categories", (req, res) => {
  Category.create({ name: req.body.name })
    .then((q) => res.status(201).json(q))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
