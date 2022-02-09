const db = require("./models");

db.sequelize
  .sync()
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.error("Database connection error", error));

module.exports = db;
