import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navegacion from './components/Navegacion';
import CrearUsuario from './components/CrearUsuario';
import ListaUsuarios from './components/ListaUsuarios';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div>
      <Navegacion />
      <div className='container p-4'>
        <Routes>
          <Route path='/' element={<ListaUsuarios />} />
          <Route path='/crear-usuario' element={<CrearUsuario />} />
          <Route path='/edit/:id' element={<CrearUsuario />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;