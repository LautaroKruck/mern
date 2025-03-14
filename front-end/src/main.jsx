import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ProveedorSesion } from './context/SesionContext'; // Importar el contexto de sesión
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProveedorSesion> {/* Contexto envuelve toda la app */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProveedorSesion>
  </StrictMode>
);
