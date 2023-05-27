const express = require("express");
const bodyParser = require("body-parser");
const { logging } = require("./middleware");
const { userRouter, bookRouter, libraryRouter, authRouter } = require("./routes");
const { authMiddleware } = require("./middleware/authentication-jwt");
const { initializeDB } = require("./config/dbConfig");

const PORT = 8080;

const app = express();

app.use(bodyParser.json());
app.use(logging);

app.use("/user", authMiddleware, userRouter);
app.use("/login", authRouter);
app.use("/book", authMiddleware, bookRouter);
app.use("/library", authMiddleware, libraryRouter);

app.listen(PORT, async () => {
    await initializeDB();
    console.log(`Servidor encendido. Escuchando peticiones en el puerto ${PORT}`);
})