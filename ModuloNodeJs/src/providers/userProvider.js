// Definimos la logica de configuración y creación de objetos User
const { Op } = require("sequelize");
const { User} = require("../models");

// Crear usuario.
const createUser = async(userOptions) => {
    try {
        const newUser = await User.create(userOptions);
        return newUser;
    } catch (error) {
        throw error;
    }
};

// Obtener un usuario por Id.
const getUser = async(id) => {
    try {
        const user = await User.findByPk(id, { include: [{all: true}]});
        if(user) {
            return user;
        } else {
            throw new Error("Usuario no encontrado.");
        }
    } catch (error) {
        throw error;
    }
};

// Obtener todos los usuarios con o sin criterio de busqueda.
const getUsers = async(criteria) => {
    try {
        let options = { include: [{ all: true }]};
        if (criteria) {
            options = { ...options,
                where: {
                    [Op.or]: criteria // Debe cumplir al menos 1
                }
            };
        }
        const users = await User.findAll(options);

        if(users) {
            return users;
        } else {
            throw new Error("No se encontraron usuarios con ese criterio de busqueda")
        };
    } catch (error) {
        throw error;
    }
};

// Modificar un usuario. 
const updateUser = async(userId, userOptions) => {
    try {
        await getUser(userId); // Verifica si existe el usuario
        const [numRowsUpdated] = await User.update(userOptions, {
            where: { id: userId },
        });
        console.log(`Se actualizaron ${numRowsUpdated} filas en la Base de Datos`);
        return User.findByPk(userId);
    } catch (error) {
        throw error;
    }
};

// Eliminar un usuario.
const deleteUser = async(userId) => {
    try {
        return User.destroy({ where: { id: userId }});
    } catch (error) {
        throw error;
    }
};

// Validar un usuario.
const validateUser = async(email, password) => {
    try {
        const user = await User.findOne({
            where: { email, password },
        });
        if( user) {
            return user;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
    validateUser,
};