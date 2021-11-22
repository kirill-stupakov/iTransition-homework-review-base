"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Review, Rating }) {
      // define association here

      this.hasMany(Review, { foreignKey: "authorUUID" });
      this.hasMany(Rating, { foreignKey: "userUUID" });
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
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
