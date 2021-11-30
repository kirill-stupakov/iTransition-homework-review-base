"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Category, TagRelation, Rating }) {
      // define association here
      this.belongsTo(User, { foreignKey: "authorUUID" });
      this.belongsTo(Category, { foreignKey: "category" });
      this.hasMany(TagRelation, { foreignKey: "reviewId" });
      this.hasMany(Rating, { foreignKey: "reviewId" });
    }
  }
  Review.init(
    {
      authorUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING(16),
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      body: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      mark: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      rating: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      imageGroupUUID: {
        allowNull: true,
        type: DataTypes.STRING(40),
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
