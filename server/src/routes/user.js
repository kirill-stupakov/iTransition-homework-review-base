const express = require("express");
const { User } = require("../db");
const { Op, Sequelize } = require("sequelize");

const router = express.Router();

router.get("/users/profile/:uuid", async (req, res) => {
  const { uuid } = req.params;
  if (!req.user || (!req.user.isAdmin && req.user.uuid !== uuid)) {
    res.status(403).json({ message: "unauthorized" });
    return;
  }
  const user = await User.findOne({
    where: {
      uuid,
    },
    attributes: ["uuid", "name", "isAdmin", "createdAt"],
  });
  res.status(200).json(user);
});

router.get("/users/info/:uuid", async (req, res) => {
  const { uuid } = req.params;
  const user = await User.findOne({
    where: {
      uuid,
    },
    attributes: ["uuid", "name"],
  });
  res.status(200).json(user);
});

router.get("/users/:sortBy/:sortMode/:searchString?", async (req, res) => {
  const { sortBy, sortMode, searchString } = req.params;
  if (!req.user || !req.user.isAdmin) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }
  const users = await User.findAll({
    raw: true,
    where: { name: { [Op.substring]: searchString || "" } },
    order: [[sortBy, sortMode]],
    attributes: ["name", "uuid", "createdAt", "isAdmin", "authService"],
  });
  res.status(200).json(users);
});

router.put("/users/switchAdmin/:uuid", async (req, res) => {
  const { uuid } = req.params;
  if (!req.user || !req.user.isAdmin) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }
  await User.update(
    { isAdmin: Sequelize.literal("NOT isAdmin") },
    { where: { uuid } }
  );

  res.status(201).json({ message: "successfully modified" });
});

module.exports = router;
