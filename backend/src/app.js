const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const usuarioRoutes = require('./routes/usuario');
const authRoutes = require('./routes/auth');

// Configuración
app.set('port', process.env.PORT || 4000);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'img')));

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenido a la API RESTful');
});

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);

module.exports = app;
