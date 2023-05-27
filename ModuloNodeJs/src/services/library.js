const libraryProvider = require("../providers/libraryProvider");

// Se define la lógica de negocio de library para reutilizar en otras partes de la app.
const getLibrary = async (id) => {
    return await libraryProvider.getLibrary(id);
}

const getLibraries = async (options) => {
    return await libraryProvider.getLibraries(options);
}

const createLibrary = async (library) => {
    return await libraryProvider.createLibrary(library);
};

const updateLibrary = async (id, library) => {
    return await libraryProvider.updateLibrary(id, library);
}

const deleteLibrary = async(id) => {
    return await libraryProvider.deleteLibrary(id);
}

module.exports = { getLibrary, getLibraries, createLibrary, updateLibrary, deleteLibrary }