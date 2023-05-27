// Definimos la logica de configuración y creación de objetos Book.
const { Op } = require("sequelize");
const { Book } = require("../models");

// Crear libro.
const createBook = async(bookOptions) => {
    try {
        const newBook = await Book.create(bookOptions);
        return newBook;
    } catch (error) {
        throw error;
    }
};

// Obtener un libro por ID. 
const getBook = async(id) => {
    try {
        const book = await Book.findByPk(id); 
        if (book) {
            return book
        } else {
            throw new Error("Libro no encontrada.")
        } 
    } catch (error) {
        throw error;
    };
};

// Obtener todos los libros.
const getBooks = async() => { 
    try {
        const books = await Book.findAll({ all: true });

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
        // const books = await Book.findAll(options);
        
        /* Si NO quisiera que traiga los libros eliminados lo haría así: */
        // const books = await Library.findAll({ 
        //     where: {
        //         isDeleted: false
        //     },
        //     all: true });

        if(books) {
            return books;
        } else {
            throw new Error(
                "No se encontro ningun libro creado."
            );
        }
    } catch (error) {
        throw error;
    }
};

// Modificar un libro.
const updateBook = async(bookId, bookOptions) => {
    try {
        await getBook(bookId); // Verifica que exista la libro. 
        const [numRowsUpdated] = await Book.update(bookOptions, {
            where: { id: bookId},
        }); 
        console.log(`Se actualizaron ${numRowsUpdated} filas en la Base de Datos.`);
        return Book.findByPk(bookId);
    } catch (error) {
        throw error;
    }
};

// Eliminado lógico de un libro
const deleteBook = async(bookId) => {
    try {
        const book = await Book.findByPk(bookId);
        if (book) {
            book.isDeleted = true;
            await book.save();
            console.log("Libro eliminado correctamente.");
            return book;
        } else {
            throw new Error ("Libro no encontrado.");
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createBook,
    deleteBook,
    getBook,
    getBooks,
    updateBook,
};