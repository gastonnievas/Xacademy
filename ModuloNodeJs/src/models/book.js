// Definimos el modelo de Libro de nuestro ORM sequelize
const { DataTypes, INTEGER } = require("sequelize");
const { sequelize } = require("../config/dbConfig");
const Library = require("./library");

const Book = sequelize.define("Books", {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    // },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    libraryId: {
        type: DataTypes.INTEGER,
        allowNull: true, // El libro puede pertenecer a una librería o no. 
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

// Definimos las relaciones con los otros modelos.
Library.hasMany(Book, { foreignKey: 'libraryId'});
Book.belongsTo(Library, { foreignKey: 'libraryId'});

module.exports = Book;