const axios = require("axios");

const payload = { user: "admin", password: "admin" };

axios
    .post(`http://localhost:8080/login`, payload) // Probar ${app.js.PORT}
    .then(function (response) {
        cosole.log(response.data);
        const token = response.data.token;
        axios
            .get(`http://localhost:8080/user/1`, {
                headers: { Authorization: `Bearer ${token}`},
            })
            .then((response) => {
                const usuario = response.data;
                console.log("Usuario encontrado.");
                console.log(
                    `El usuario se llama ${usuario.name} ${usuario.lastname}.`
                );
            });
    })
    .catch(function (error) {
        console.log(error);
    });