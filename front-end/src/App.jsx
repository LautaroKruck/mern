import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navegacion from './components/Navegacion';
import ActualizarPerfil from './components/Perfil';
import Registro from './components/Registro';
import ListaUsuarios from './components/ListaUsuarios';
import Login from './components/Login';
import RutaProtegida from './components/RutaP';

function App() {
  const location = useLocation();

  return (
    <div>
      <Navegacion />
      <div className='container p-4'>
        <Routes location={location} key={location.pathname}>
          {/* Rutas accesibles sin sesión */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registro />} />

          {/* Rutas protegidas */}
          <Route 
            path='/' 
            element={
              <RutaProtegida>
                <ListaUsuarios />
              </RutaProtegida>
            } 
          />
          <Route 
            path='/perfil' 
            element={
              <RutaProtegida>
                <ActualizarPerfil />
              </RutaProtegida>
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
