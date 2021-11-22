"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Review }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userUUID" });
      this.belongsTo(Review, { foreignKey: "reviewId" });
    }
  }
  Rating.init(
    {
      userUUID: { type: DataTypes.UUID, primaryKey: true },
      reviewId: { type: DataTypes.INTEGER, primaryKey: true },
      rating: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Rating",
    }
  );
  return Rating;
};
