const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');
const { verificarToken } = require('../middlewares/auth');
const upload = require('../middlewares/multer');

// Registro de usuario
router.post('/register', upload.single('foto'), usuarioCtrl.createUsu);

// Login de usuario (aún no implementado en el controller, se debe agregar)
router.post('/login', usuarioCtrl.login);

// Actualizar perfil del usuario autenticado
router.put('/perfil/:id', verificarToken, upload.single('foto'), usuarioCtrl.updateUsu);

// Obtener datos del usuario autenticado
router.get('/perfil/:id', verificarToken, usuarioCtrl.getUsuario);

// Obtener todos los usuarios (requiere autenticación, pero podría abrirse según necesidad)
router.get('/usuarios', verificarToken, usuarioCtrl.listarUsuarios);

// Eliminar un usuario por ID
router.delete('/usuarios/:id', verificarToken, usuarioCtrl.deleteUsu);

module.exports = router;