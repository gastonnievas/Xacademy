const userProvider = require("../providers/userProvider");

// Se define la lógica de negocio de user para reutilizar en otras partes de la app.

const getUser = async (id) => {
    return await userProvider.getUser(id);
}

const getUsers = async (options) => {
    return await userProvider.getUsers(options);
}

const createUser = async (user) => {
    return await userProvider.createUser(user);
};

const updateUser = async (id, user) => {
    return await userProvider.updateUser(id, user);
}

const deleteUser = async(id) => {
    return await userProvider.deleteUser(id);
}

const queryUser = (nombre) => {};

module.exports = { getUser, getUsers, createUser, updateUser, deleteUser, queryUser}