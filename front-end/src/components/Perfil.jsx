import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const valorInicial = {
    nombre: "",
    apellido: "",
    edad: 18,
    telefono: "",
    correo: "",
    foto: "",
  };

  const [usuario, setUsuario] = useState(valorInicial);
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/usuarios/perfil", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsuario(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error al obtener los datos del perfil");
      } finally {
        setLoading(false);
      }
    };

    obtenerPerfil();
  }, []);

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const capturarFoto = (e) => {
    setFoto(e.target.files[0]);
  };

  const actualizarPerfil = async (e) => {
    e.preventDefault();

    if (usuario.edad < 18) {
      setError("La edad debe ser mayor o igual a 18");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", usuario.nombre);
    formData.append("apellido", usuario.apellido);
    formData.append("edad", usuario.edad);
    formData.append("telefono", usuario.telefono);
    formData.append("correo", usuario.correo);
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      await axios.put("http://localhost:4000/api/usuarios/perfil", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Perfil actualizado exitosamente");
      navigate("/perfil");
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar el perfil");
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h2 className="text-center mb-3">Actualizar Perfil</h2>

        {error && <p className="text-danger text-center">{error}</p>}

        {loading ? (
          <p className="text-center">Cargando datos...</p>
        ) : (
          <form onSubmit={actualizarPerfil}>
            {usuario.foto && (
              <div className="text-center mb-3">
                <img
                  src={`http://localhost:4000/img/${usuario.foto}`}
                  alt="Foto de perfil"
                  className="img-fluid rounded-circle"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  onError={(e) => { e.target.src = "/img/noFoto.png"; }}
                />
              </div>
            )}

            <div className="mb-3">
              <label>Nombre:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa tu nombre"
                required
                name="nombre"
                value={usuario.nombre}
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
                value={usuario.apellido}
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
                value={usuario.edad}
                onChange={capturarDatos}
                min="18"
              />
            </div>
            <div className="mb-3">
              <label>Teléfono:</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Ingresa tu teléfono"
                required
                name="telefono"
                value={usuario.telefono}
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
                value={usuario.correo}
                onChange={capturarDatos}
              />
            </div>
            <div className="mb-3">
              <label>Foto de perfil:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={capturarFoto}
              />
            </div>
            <div className="text-center">
              <button className="btn btn-dark">Actualizar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Perfil;
