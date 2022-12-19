"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//Configuración de la base de datos
const database = new sequelize_1.Sequelize('webschool', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = database;
//# sourceMappingURL=connection.js.map