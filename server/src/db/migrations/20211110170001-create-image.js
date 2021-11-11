"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Images", {
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Images");
  },
};
