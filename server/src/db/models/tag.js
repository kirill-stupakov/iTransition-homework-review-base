"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ TagRelation }) {
      // define association here
      this.hasMany(TagRelation, { foreignKey: "tag" });
    }
  }
  Tag.init(
    {
      name: { type: DataTypes.STRING(16), primaryKey: true, allowNull: false },
      count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
