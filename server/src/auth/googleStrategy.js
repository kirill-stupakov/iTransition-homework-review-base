const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { sequelize, User } = require("../db");

require("dotenv").config();

module.exports = new GoogleStrategy(
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
);
