// Se definen las rutas para cada endpoint de library en la API
const express = require("express");
const libraryService = require("../services/library");
const router = express.Router();
const { authIsAdmin } = require("../middleware/authentication-jwt");

// Ruta para crear una librería. Con AUTH
router.post("/", authIsAdmin, async(req, res) => {
    const libraryId = req.params.libraryId;
    try {
        const { nombre,localizacion, telefono } = req.body; 
        const newLibrary = await libraryService.createLibrary({
            nombre, 
            localizacion, 
            telefono,
        });
        res.status(201).json(newLibrary);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

// Ruta para obtener una librería.
router.get("/:libraryId", async(req, res) => {
    const libraryId = req.params.libraryId;
    try{
        const library = await libraryService.getLibrary(libraryId);
        res.status(200).json(library);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener todas las librerías.
router.get("/", async(req, res) => {
    try {
        const libraries = await libraryService.getLibraries();
        res.status(200).json(libraries)
    } catch ( error ) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para modificar una librería. Con AUTH
router.put("/:libraryId", authIsAdmin, async(req, res) => {
    const { nombre, localizacion, telefono, isDeleted } = req.body;
    const libraryId = req.params.libraryId;
    try {
        const newLibrary = await libraryService.updateLibrary(libraryId, {
            nombre, 
            localizacion, 
            telefono,
            isDeleted,
        });
        res.status(200).json(newLibrary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminado lógico de una librería. Con AUTH
router.delete("/:libraryId", authIsAdmin, async(req, res) => {
    const libraryId = req.params.libraryId;
    try{
        const library = await libraryService.deleteLibrary(libraryId);
        res.status(200).json(library);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;