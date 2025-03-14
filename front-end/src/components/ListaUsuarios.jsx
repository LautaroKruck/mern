import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListaUsuario = () => {
  const [lista, setLista] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/usuarios");
        setLista(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error al cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };
    getUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/usuarios/${id}`);
      setLista(lista.filter(usuario => usuario._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Error al eliminar el usuario");
    }
  };

  return (
    <div className="container">
      <h2>Lista de Usuarios</h2>
      {error && <p className="text-danger">{error}</p>}
      {loading ? <p>Cargando usuarios...</p> : null}
      
      <div className="row">
        {lista.length === 0 && !loading && <p>No hay usuarios registrados.</p>}
        
        {lista.map((list) => (
          <div className="col-md-4 p-2" key={list._id}>
            <div className="card">
              <img
                src={`http://localhost:4000/img/${list.foto}`}
                alt={`Foto de ${list.nombre}`}
                className="card-img img-fluid img-thumbnail w-50 mx-auto d-block"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                onError={(e) => { e.target.src = "/img/noFoto.png"; }} // Fallback en caso de error
              />
              <div className="card-header text-center">
                <h5>{list.nombre}</h5>
              </div>
              <div className="card-body">
                <p>Apellidos: {list.apellido}</p>
                <p>Edad: {list.edad}</p>
                <p>Teléfono: {list.telefono}</p>
                <p>Correo: {list.correo}</p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-danger mx-1" onClick={() => eliminarUsuario(list._id)}>
                  Eliminar
                </button>
                <Link to={`/edit/${list._id}`} className="btn btn-dark mx-1">
                  Editar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaUsuario;