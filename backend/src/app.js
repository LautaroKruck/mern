const express = require('express');
const cors = require('cors');
const path = require('path');
const usuarioRoutes = require('./routes/usuario');
const authRoutes = require('./routes/usuario');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'img')));

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenido a la API RESTful');
});

app.use('/api/usuarios', usuarioRoutes);

module.exports = app;
