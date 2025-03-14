import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SesionContext } from '../context/SesionContext';

const Login = () => {
  const [user, setUser] = useState({ correo: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { iniciarSesion } = useContext(SesionContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:4000/api/usuarios/login', user);

      if (res.data.success) {
        iniciarSesion(user.correo);
        navigate('/');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Error en el inicio de sesión');
      } else {
        setError('No se pudo conectar con el servidor');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          className="form-control mb-2"
          value={user.correo}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="form-control mb-2"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-dark w-100" type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;