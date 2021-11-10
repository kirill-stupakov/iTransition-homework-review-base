"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Review }) {
      // define association here

      this.hasMany(Review, { foreignKey: "category" });
    }
  }
  Category.init(
    {
      name: { allowNull: false, primaryKey: true, type: DataTypes.STRING(16) },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
