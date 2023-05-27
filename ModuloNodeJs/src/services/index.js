// Lógica de negocio de la aplicación.
const { getUser, getUsers, createUser, updateUser, deleteUser, queryUser } = require("./user");
const { getLibrary, getLibraries, createLibrary, updateLibrary, deleteLibrary } = require("./library");
const { getBook, getBooks, createBook, updateBook, deleteBook} = require("./book");

module.exports = {getUser, getUsers, createUser, updateUser, deleteUser, queryUser,
    getLibrary, getLibraries, createLibrary, updateLibrary, deleteLibrary,
    getBook, getBooks, createBook, updateBook, deleteBook };