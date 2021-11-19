const express = require("express");
const passport = require("./passport");
const router = express.Router();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { sequelize, User } = require("../db");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const [user, created] = await User.findOrCreate({
        raw: true,
        where: {
          authId: profile.id,
          authService: "google",
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
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(process.env.CLIENT_URI);
  }
);

module.exports = router;
