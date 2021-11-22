"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Ratings", {
      authorUUID: { type: DataTypes.UUID, primaryKey: true },
      reviewId: { type: DataTypes.INTEGER, primaryKey: true },
      rating: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Ratings");
  },
};
