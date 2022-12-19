import { Sequelize } from "sequelize";

//Configuración de la base de datos
const database = new Sequelize('webschool', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default database;