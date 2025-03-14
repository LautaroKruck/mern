const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../img')); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname); // Extraemos la extensión del archivo
    const nombre = req.body.nombre.replace(/\s+/g, ''); // Eliminar espacios del nombre
    const apellido = req.body.apellido.replace(/\s+/g, ''); // Eliminar espacios del apellido
    const telefono = req.body.telefono.replace(/\s+/g, ''); // Eliminar espacios del teléfono
    const nombreFoto = `${nombre}${apellido}${telefono}${extension}`; // Generamos un nombre único
    req.body.nombreFoto = nombreFoto; // Asigna el nombre de la foto a req.body.nombreFoto
    callback(null, nombreFoto); // Usa el nombre de archivo generado
  }
});

const upload = multer({ storage });

module.exports = upload;
