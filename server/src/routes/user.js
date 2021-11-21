const express = require("express");
const { User } = require("../db");

const router = express.Router();

router.post("/users", (req, res) => {
  const { authId, authService, name } = req.body;
  User.create({ authId, authService, name })
    .then((user) => res.status(201).json(user))
    .catch((error) => res.status(500).json(error));
});

router.get("/users/:uuid", (req, res) => {
  const { uuid } = req.params;
  User.findOne({
    where: {
      uuid,
    },
    attributes: ["uuid", "name", "isAdmin", "createdAt"],
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
