// src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/auth/register', user);
      navigate('/login'); // Redirigir al login después del registro
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el registro');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" className="form-control mb-2" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" className="form-control mb-2" onChange={handleChange} required />
        <button className="btn btn-dark w-100" type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
