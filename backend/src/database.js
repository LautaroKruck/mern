const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI || 'mongodb://localhost/dbtest';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('La base de datos ha sido conectada:', URI))
    .catch(error => console.error('Error al conectar con la base de datos:', error));

module.exports = mongoose;
