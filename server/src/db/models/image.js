"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Review }) {
      // define association here

      this.belongsTo(Review, { foreignKey: "reviewId" });
    }
  }
  Image.init(
    {
      reviewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING(512),
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
