// Definimos la logica de configuración y creación de objetos Library.
const { Op } = require("sequelize");
const { Library } = require("../models");
const { Book } = require("../models"); // Para incluir los libros o excluir los libros eliminados.

// Crear librería.
const createLibrary = async(libraryOptions) => {
    try {
        const newLibrary = await Library.create(libraryOptions);
        return newLibrary;
    } catch (error) {
        throw error;
    }
};

// Obtener 1 libreria por ID. Incluye todos los libros. 
const getLibrary = async(id) => {
    try {        
        // Traigo la librería con el id. NO INCLUYE LIBROS ELIMINADOS.
        const library = await Library.findByPk(id, { 
            include: {
                model: Book,
                where: { isDeleted: false},
            },    
        });

        // Si deseo incluir TODOS los libros lo hago así: 
        // const library = await Library.findByPk(id, { include: [{ all: true }] });  
        
        if (library) {
            return library
        } else {
            throw new Error("Librería no encontrada.")
        } 
    } catch (error) {
        throw error;
    };
};

// Obtener todas las librerías. Incluye librerías eliminadas.
const getLibraries = async() => { 
    try {    
        const libraries = await Library.findAll({ all: true });

        /* Si quisiera buscar por criterio COLOCARIA = async(criteria)
        y luego seguiría así: */
        // let options = { include: [{ all: true }]};
        // if(criteria) {
        //     options = {...options, 
        //     where: {
        //         [Op.or]: criteria
        //         }
        //     };
        // }
        // const libraries = await Library.findAll(options);
        
        /* Si NO quisiera que traiga las librerías eliminadas lo haría así: */
        // const libraries = await Library.findAll({ 
        //     where: {
        //         isDeleted: false
        //     },
        //     all: true });

        if(libraries) {
            return libraries;
        } else {
            throw new Error(
                "No se encontro ninguna librería creada."
            );
        }
    } catch (error) {
        throw error;
    }
};

// Modificar una librería. 
const updateLibrary = async(libraryId, libraryOptions) => {
    try {
        await getLibrary(libraryId); //Verifica que exista la librería. 
        const [numRowsUpdated] = await Library.update(libraryOptions, {
            where: { id: libraryId},
        }); 
        console.log(`Se actualizaron ${numRowsUpdated} filas en la Base de Datos.`);
        return Library.findByPk(libraryId);
    } catch (error) {
        throw error;
    }
};

// Eliminado lógico de una librería.
const deleteLibrary = async(libraryId) => {
    try {
        const library = await Library.findByPk(libraryId);
        if (library) {
            library.isDeleted = true;
            await library.save();
            console.log("Librería eliminada correctamente.");
            return library;
        } else {
            throw new Error ("Librería no encontrada.");
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createLibrary,
    deleteLibrary,
    getLibrary,
    getLibraries,
    updateLibrary,
};