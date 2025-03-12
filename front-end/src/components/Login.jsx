// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', user);
      localStorage.setItem('token', res.data.token); // Guardar token en localStorage
      navigate('/'); // Redirigir a la página principal
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el inicio de sesión');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" className="form-control mb-2" onChange={handleChange} required />
        <button className="btn btn-dark w-100" type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;