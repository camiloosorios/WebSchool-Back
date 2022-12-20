import { QueryInterface, DataTypes } from "sequelize";
module.exports = {
  up: async (queryInterface: QueryInterface):Promise<void> => {
    
    queryInterface.addColumn('users', 'image', {
      type: DataTypes.STRING,
      allowNull: true
    })
  },

  down: async (queryInterface: QueryInterface): Promise<void> =>queryInterface.removeColumn('users', 'image')
};
