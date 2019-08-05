const express = require('express');
const app = express();
request = require('request');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv/config');
let port = process.env.PORT;
let router = express.Router();

usuarios = require('./controller/usuariosController.js');

app.use('/', router);

router.get('/usuarios',
usuarios.getUsuarios,
(req, res) => {
    res.json();
});

app.listen(port, function () {
    console.log('Servidor express iniciado na porta: 8080');
});
