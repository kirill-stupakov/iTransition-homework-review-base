"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("TagRelations", {
      reviewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      tag: {
        type: DataTypes.STRING(16),
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
    await queryInterface.dropTable("TagRelations");
  },
};
