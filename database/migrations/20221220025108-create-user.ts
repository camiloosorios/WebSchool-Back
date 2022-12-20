import { QueryInterface, DataTypes } from "sequelize";

module.exports = {

  up: async(queryInterface: QueryInterface): Promise<void> => await queryInterface.createTable('users', {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.dropTable('Users')

  };