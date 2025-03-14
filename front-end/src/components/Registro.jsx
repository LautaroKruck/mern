import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterUsuario = () => {
  const valorInicial = {
    nombre: '',
    apellido: '',
    edad: 18,
    telefono: '',
    correo: '',
    foto: '',
    password: '',
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(valorInicial); // Estado para los datos del usuario
  const [error, setError] = useState('');
  const [foto, setFoto] = useState(null); // Estado para la foto del usuario

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const capturarFoto = (e) => {
    setFoto(e.target.files[0]); // Guardar la foto seleccionada
  };

  const registrarUsuario = async (e) => {
    e.preventDefault(); // Evita recargar la página

    // Crear un objeto FormData para enviar los datos del usuario y la foto
    const formData = new FormData();
    formData.append('nombre', user.nombre);
    formData.append('apellido', user.apellido);
    formData.append('edad', user.edad);
    formData.append('telefono', user.telefono);
    formData.append('correo', user.correo);
    formData.append('password', user.password);
    if (foto) {
      formData.append('foto', foto); // Añadir la foto al formulario si se ha seleccionado una
    }

    try {
      // Enviar datos al backend
      await axios.post('http://localhost:4000/api/usuarios/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Especificar el tipo de contenido
        }
      });

      // Reiniciar el formulario
      setUser({ ...valorInicial });
      setFoto(null); // Vaciar la foto seleccionada
      navigate('/login'); 
    } catch (err) {
      console.error(err); // Para depuración
      setError(err.response?.data?.message || 'Error en el registro');
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
      <h2 className="text-center mb-3">Registrar Usuario</h2>
      {error && <p className="text-danger">{error}</p>}
        <form onSubmit={registrarUsuario}>
          <div className="mb-3">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu nombre"
              required
              name="nombre"
              value={user.nombre}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Apellido:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu apellido"
              required
              name="apellido"
              value={user.apellido}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Edad:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa tu edad"
              required
              name="edad"
              value={user.edad}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Teléfono:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa tu teléfono"
              required
              name="telefono"
              value={user.telefono}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Correo:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Ingresa tu correo electrónico"
              required
              name="correo"
              value={user.correo}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Ingresa tu contraseña"
              required
              name="password"
              value={user.password}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Foto de perfil:</label>
            <input
              type="file"
              className="form-control"
              accept="image/*" // Aceptar solo imágenes
              onChange={capturarFoto}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-dark">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUsuario;