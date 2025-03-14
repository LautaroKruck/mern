const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/datausuarios';

const conectarDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Base de datos conectada:', MONGODB_URI);
  } catch (error) {
    console.error('❌ Error en la conexión a la base de datos:', error);
    process.exit(1); // Sale del proceso si no se puede conectar
  }
};

module.exports = conectarDB;
