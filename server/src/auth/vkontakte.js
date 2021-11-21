const express = require("express");
const passport = require("./passport");
const router = express.Router();
const VkontakteStrategy = require("passport-vkontakte").Strategy;
const { sequelize, User } = require("../db");
require("dotenv").config();

passport.use(
  new VkontakteStrategy(
    {
      clientID: process.env.VKONTAKTE_CLIENT_ID,
      clientSecret: process.env.VKONTAKTE_CLIENT_SECRET,
      callbackURL: "/auth/vkontakte/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      const [user, created] = await User.findOrCreate({
        raw: true,
        where: {
          authId: profile.id,
          authService: "vkontakte",
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

router.get("/auth/vkontakte", passport.authenticate("vkontakte"));

router.get(
  "/auth/vkontakte/callback",
  passport.authenticate("vkontakte", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.CLIENT_URI);
  }
);

module.exports = router;
