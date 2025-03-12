require('dotenv').config();
const app = require('./app');
require('./database');

// Ejecutamos el servidor
async function main() {
    try {
        await app.listen(app.get('port'));
        console.log('El servidor se está escuchando en el puerto:', app.get('port'));
    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
    }
}

main();
