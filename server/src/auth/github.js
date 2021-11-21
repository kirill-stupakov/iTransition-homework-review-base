const express = require("express");
const passport = require("./passport");
const router = express.Router();
const GithubStrategy = require("passport-github2").Strategy;
const { sequelize, User } = require("../db");
require("dotenv").config();

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const [user, created] = await User.findOrCreate({
        raw: true,
        where: {
          authId: profile.id,
          authService: "github",
        },
        defaults: {
          name: profile.displayName,
        },
        attributes: ["uuid", "name"],
      });

      done(null, user);
    }
  )
);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["read:user"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.CLIENT_URI);
  }
);

module.exports = router;
