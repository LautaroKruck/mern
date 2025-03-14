// Cargar variables de entorno desde .env
require('dotenv').config();

// Importaciones necesarias
const app = require('./app'); // Importa la configuración de Express
const conectarDB = require('./database'); // Función para conectar a MongoDB

// Configuración del puerto
const PORT = process.env.PORT || 4000;

// Función para iniciar el servidor
const iniciarServidor = async () => {
  try {
    console.log('🔄 Iniciando conexión con la base de datos...');
    await conectarDB(); // Conectar a MongoDB
    console.log('✅ Conexión establecida con la base de datos.');

    // Iniciar servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error crítico al iniciar el servidor:', error);
    process.exit(1); // Detiene el proceso si hay un error grave
  }
};

// Llamar a la función para arrancar la aplicación
iniciarServidor();
