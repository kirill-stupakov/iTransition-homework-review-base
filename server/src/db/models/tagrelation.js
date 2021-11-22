"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TagRelation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Review, Tag }) {
      // define association here
      this.belongsTo(Tag, { foreignKey: "tag" });
      this.belongsTo(Review, { foreignKey: "reviewId" });
    }
  }
  TagRelation.init(
    {
      reviewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      tag: {
        type: DataTypes.STRING(16),
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "TagRelation",
    }
  );
  return TagRelation;
};
