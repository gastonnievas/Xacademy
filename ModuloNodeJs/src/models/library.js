// Definimos el modelo de Librería de nuestro ORM sequelize
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Library = sequelize.define('Library', {
    // id: {
    //     type:DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    // },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    localizacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,        
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Library; 