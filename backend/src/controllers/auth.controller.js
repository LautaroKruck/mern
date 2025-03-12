const usuarioCtrl = {};
const Usuario = require('../models/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
usuarioCtrl.register = async (req, res) => {
  try {
    const { nombre, apellido, correo, telefono, edad, password } = req.body;

    if (!nombre || !apellido || !correo || !telefono || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      correo,
      telefono,
      edad,
      password
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

// Inicio de sesión
usuarioCtrl.login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    if (!correo || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passwordValida = await usuario.comparePassword(password);
    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario._id, correo: usuario.correo }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

module.exports = usuarioCtrl;