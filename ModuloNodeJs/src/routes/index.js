// En index definimos las rutas principales. 
const userRouter = require("./user");
const authRouter = require("./auth");
const bookRouter = require("./book");
const libraryRouter = require("./library");

module.exports = { userRouter, authRouter, bookRouter, libraryRouter};