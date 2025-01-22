const express = require('express');
const cors = require('cors');
const route = require('./src/routes');
require('dotenv').config();

const app = express();

// Configurando middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definindo as rotas da API
app.use("/api", route);

module.exports = app;
