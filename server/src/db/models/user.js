"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Review }) {
      // define association here

      this.hasMany(Review, { foreignKey: "authorUUID" });
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      authId: { type: DataTypes.STRING(64), allowNull: false },
      authService: { type: DataTypes.STRING(16), allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      karma: { type: DataTypes.INTEGER, defaultValue: 0 },
      reviews: { type: DataTypes.INTEGER, defaultValue: 0 },
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
