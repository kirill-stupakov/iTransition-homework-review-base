const passport = require("passport");
const { sequelize, User } = require("../db");

passport.serializeUser((user, done) => {
  return done(null, user.uuid);
});

passport.deserializeUser(async (uuid, done) => {
  const user = await User.findOne({
    where: { uuid },
    attributes: ["uuid", "name", "isAdmin"],
  });
  return done(null, user);
});

module.exports = passport;
