const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const authSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, min: 0, max: 120 },
  telefono: { type: Number, required: true },
  correo: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'El correo debe tener un formato válido']
  },
  foto: { type: String },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

// Middleware para hashear la contraseña antes de guardar
authSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
authSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model('Auth', authSchema);
