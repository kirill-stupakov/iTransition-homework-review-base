const GithubStrategy = require("passport-github2").Strategy;

const { sequelize, User } = require("../db");

require("dotenv").config();

module.exports = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);

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
);
