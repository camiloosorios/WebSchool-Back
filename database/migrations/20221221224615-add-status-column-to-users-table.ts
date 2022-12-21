import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async(queryInterface: QueryInterface): Promise<void> => {

    await queryInterface.addColumn('users', 'status', {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    });

  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
   
    await queryInterface.removeColumn('users', 'status');
    
  }
};
