// Definimos el modelo de Usuario de nuestro ORM sequelize
const { DataTypes } =require("sequelize");
const { sequelize } = require("../config/dbConfig");

const User = sequelize.define("Users", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;