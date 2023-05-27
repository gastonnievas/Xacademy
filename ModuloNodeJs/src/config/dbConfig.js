const { Sequelize } = require("sequelize");

// Creamos la base de datos.
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./dabase.sqlite",
});

// Método para inicializar la base de datos. 
const initializeDB = async() => {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos establecida.");
        await sequelize.sync({ force: false}); //No borra los datos al reiniciar.
    } catch (error) {
        console.error("Hubo un error al inicializar la base de datos.");
    }
};

// Exportamos para utilizar en la creación de los modelos. 
module.exports = { sequelize, initializeDB };