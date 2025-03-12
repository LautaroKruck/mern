const { Router } = require('express');
const usuarioCtrl = require('../controllers/auth.controller');
const multer = require('multer');
const path = require('path');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = Router();

// Configuración de Multer para manejar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../img'));
  },
  filename: (req, file, cb) => {
    const nombreFoto = `${Date.now()}-${file.originalname}`;
    req.body.nombreFoto = nombreFoto;
    cb(null, nombreFoto);
  }
});

const upload = multer({ storage });

// Rutas de usuario
router.get('/', verificarToken, usuarioCtrl.getUsu);
router.get('/:id', verificarToken, usuarioCtrl.getUsuario);
router.post('/', verificarToken, upload.single('foto'), usuarioCtrl.createUsu);
router.put('/:id', verificarToken, upload.single('foto'), usuarioCtrl.updateUsu);
router.delete('/:id', verificarToken, usuarioCtrl.deleteUsu);

module.exports = router;
