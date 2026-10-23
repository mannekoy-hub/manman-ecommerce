import { Home } from './Page/Home';
import { Category } from './Page/Category';
import { Login } from './Page/Login';
import { Route, Routes } from 'react-router-dom';

import './App.css'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/category' element={<Category />} />
      <Route path='/login' element={<Login />} />
    </Routes>

  );
}

export default App
