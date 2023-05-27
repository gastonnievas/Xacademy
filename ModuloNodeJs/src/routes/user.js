// Se definen las rutas para cada endpoint de user en la API
const express = require("express");
const userService = require("../services/user");
const router = express.Router();
const { authIsAdmin } = require("../middleware/authentication-jwt");

// Ruta para obtener un usuario por Id
router.get("./userId", async(req, res) => {
    const reqUser = req.user;
    const userId = req.params.userId;
    try {
        const user = await userService.getUser(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener todos los usuarios o buscar con parametros.
router.get("/", async(req, res) => {
    const { nombre, email } = req.query;
    try {
        let users;
        if (Object.keys(req.query).length !== 0) {
            users = await userService.getUsers({ // Devuelve una lista de usuarios
                ...(nombre && { nombre }),
                ...(email && { email }),
            });
        } else {
            users = await userService.getUsers();
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Ruta para crear un usuario. Con AUTH
router.post("/", authIsAdmin, async(req, res) => {
    const { nombre, apellido, email, password } = req.body;
    try {
        const newUser = await userService.createUser({
            nombre, 
            apellido, 
            email, 
            password,
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para modificar un usuario. Con AUTH
router.put("/:userId", authIsAdmin, async(req, res) => {
    const userId = req.params.userId;
    const { nombre, apellido, email, password } = req.body;
    try {
        const newUser = await userService.updateUser(userId, {
            nombre, 
            apellido,
            email,
            password,
        });
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminar un usuario. Con AUTH
router.delete("/:userId", authIsAdmin, async(req,res) => {
    const userId = req.params.userId;
    try {
        const user = await userService.deleteUser(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;