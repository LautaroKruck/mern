const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const usuarioSchema = new Schema({
  nombre: String,
  apellido: String,
  edad: Number,
  telefono: String,
  correo: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  foto: String
});

// Middleware para hashear la contraseña antes de guardarla
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Solo proceder si la contraseña ha cambiado

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = async function (password) {
  return bcryptjs.compare(password, this.password);
};

const Usuario = model('Usuario', usuarioSchema);

module.exports = Usuario;