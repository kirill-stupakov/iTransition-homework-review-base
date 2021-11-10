"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
        type: DataTypes.TEXT("tiny"),
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
    await queryInterface.dropTable("Reviews");
  },
};
