const express = require("express");
const { Image } = require("../db");

const router = express.Router();

router.post("/uploadImages", (req, res) => {
  console.log(req.body);
});

module.exports = router;
