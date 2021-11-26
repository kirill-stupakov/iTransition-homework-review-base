const express = require("express");
const router = express.Router();

router.get("/getUser", (req, res) => {
  res.json(req.user);
});

router.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.json({ message: "successfully logged out" });
  }
});

module.exports = router;
