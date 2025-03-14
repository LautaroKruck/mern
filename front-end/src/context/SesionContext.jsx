import { createContext, useState, useEffect } from 'react';

// Crear contexto de sesión
export const SesionContext = createContext();

export const ProveedorSesion = ({ children }) => {
  // Estado del usuario (correo), inicializado desde localStorage
  const [correoUsuario, setCorreoUsuario] = useState(() => localStorage.getItem('correo') || null);

  // Sincroniza el estado del usuario con localStorage
  useEffect(() => {
    if (correoUsuario) {
      localStorage.setItem('correo', correoUsuario);
    } else {
      localStorage.removeItem('correo');
    }
  }, [correoUsuario]);

  // Inicia la sesión guardando el correo del usuario
  const iniciarSesion = (correo) => {
    setCorreoUsuario(correo);
  };

  // Cierra la sesión eliminando el correo del usuario
  const cerrarSesion = () => {
    setCorreoUsuario(null);
  };

  return (
    <SesionContext.Provider value={{ correoUsuario, iniciarSesion, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  );
};
