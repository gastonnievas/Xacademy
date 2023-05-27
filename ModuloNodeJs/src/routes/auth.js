const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); // Utilizamos jsonwebtoken para crear un token jwt.
const { secret } = require("../middleware/authentication-jwt");
const userProvider = require("../providers/userProvider");

// Ruta para loguear un usuario.
router.post("/", async (req, res) => {
    const { user, password } = req.body; 
    
    // Verifico los datos del usuario. Genera y devuelve el token.
    if (user === "admin" && password === "admin") {
        // Generamos el token, firmamos (sign) con la clave secret.
        const token = jwt.sign({ user, role: "Admin" }, secret);
        // Devuelve un token json.
        res.json({ token });
    } else {
        const dbUser = await userProvider.validateUser(user, password);
        if (dbUser) {
            const token = jwt.sign({ user: dbUser.email }, secret); 
            res.json({ token});
        } else {
            res.status(401).json({ message: "Autenticación fallida."});
        }
    }
});

module.exports = router;