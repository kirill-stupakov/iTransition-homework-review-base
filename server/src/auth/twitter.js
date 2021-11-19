const express = require("express");
const passport = require("./passport");
const router = express.Router();
const TwitterStrategy = require("passport-twitter").Strategy;
const { sequelize, User } = require("../db");
require("dotenv").config();

passport.use(
  new TwitterStrategy(
    {
      clientID: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: "/auth/twitter/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      const [user, created] = await User.findOrCreate({
        raw: true,
        where: {
          authId: profile.id,
          authService: "twitter",
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

router.get("/auth/twitter", passport.authenticate("twitter"));

router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.CLIENT_URI);
  }
);

module.exports = router;
