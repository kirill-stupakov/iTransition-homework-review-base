const TwitterStrategy = require("passport-twitter").Strategy;

const { sequelize, User } = require("../db");

require("dotenv").config();

module.exports = new TwitterStrategy(
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
);
