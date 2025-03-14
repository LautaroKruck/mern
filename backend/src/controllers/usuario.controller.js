const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const usuarioCtrl = {};

// Registro de usuario
usuarioCtrl.createUsu = async (req, res) => {
  try {
    const { nombre, apellido, edad, telefono, correo, password } = req.body;
    const foto = req.file ? req.file.filename : null;

    if (!nombre || !apellido || !edad || !telefono || !correo || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const nuevoUsuario = new Usuario({ nombre, apellido, edad, telefono, correo, password: hashedPassword, foto });
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

usuarioCtrl.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Buscar usuario en la base de datos
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Comparar contraseñas
    const esValida = await bcryptjs.compare(password, usuario.password);
    if (!esValida) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Si la contraseña es correcta, devolver los datos del usuario
    res.json({ 
      id: usuario._id, 
      nombre: usuario.nombre, 
      correo: usuario.correo 
    });
    

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar un usuario
usuarioCtrl.updateUsu = async (req, res) => {
  try {
    const { nombre, apellido, correo, telefono, edad, contrasenya } = req.body;
    let password;

    if (contrasenya) {
      const salt = await bcryptjs.genSalt(10);
      password = await bcryptjs.hash(contrasenya, salt);
    }

    const foto = req.file ? req.file.filename : undefined;
    const usuarioActual = await Usuario.findById(req.params.id);
    if (!usuarioActual) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (foto && usuarioActual.foto && usuarioActual.foto !== 'noFoto.png') {
      const filePath = path.join(__dirname, '../img', usuarioActual.foto);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error al eliminar la foto antigua:', err);
      });
    }

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, apellido, correo, telefono, edad, ...(password && { password }), ...(foto && { foto }) },
      { new: true }
    );

    res.json({ message: 'Usuario actualizado', usuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};

// Obtener lista de usuarios
usuarioCtrl.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    const usuariosConFoto = usuarios.map(usuario => ({
      ...usuario._doc,
      foto: usuario.foto ? `/img/${usuario.foto}` : '/img/noFoto.png',
    }));
    res.json(usuariosConFoto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};

// Eliminar usuario
usuarioCtrl.deleteUsu = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (usuario.foto && usuario.foto !== 'noFoto.png') {
      const filePath = path.join(__dirname, '../img', usuario.foto);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error al eliminar la foto:', err);
      });
    }

    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};

// Buscar un usuario
usuarioCtrl.getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
};

module.exports = usuarioCtrl;