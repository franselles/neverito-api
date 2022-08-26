'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./api/config');

const app = express();

const distDir = __dirname + '/dist/';
app.use(express.static(distDir));

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const api = require('./api/routes/index');

app.use('/api', api);

(async function () {
  try {
    await mongoose.connect(config.db);
    console.log('Conexión a la base de datos establecida...');
    app.listen(config.port, () => {
      console.log(`API REST corriendo en http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(`Error al conectar a la base de datos: ${error}`);
  }
})();
