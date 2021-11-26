const express = require("express");
const { Category } = require("../db");

const router = express.Router();

router.get("/categories", async (req, res) => {
  const categories = await Category.findAll({ attributes: ["name"] });
  const categoryNameArray = categories.map((category) => category.name);
  res.status(200).json(categoryNameArray);
});

module.exports = router;
