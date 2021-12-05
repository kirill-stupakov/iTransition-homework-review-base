const express = require("express");
const { Tag, TagRelation } = require("../db");

const router = express.Router();

router.get("/tags", async (req, res) => {
  const tags = await Tag.findAll({ raw: true });

  let tagsWithCount = await Promise.all(
    tags.map(async (tag) => {
      const { name } = tag;
      const count = await TagRelation.count({ where: { tag: name } });
      if (count === 0) {
        await Tag.destroy({ where: { name } });
      }
      return { name, count };
    })
  );
  tagsWithCount = tagsWithCount.filter((tag) => tag.count);

  res.status(201).json(tagsWithCount);
});

module.exports = router;
