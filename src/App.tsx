import { Home } from './Page/Home';
import { Productdetails } from './Page/ProductDetails';
import { Route, Routes } from 'react-router-dom';

import './App.css'

function App() {


  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path='productdetails' element={<Productdetails />}></Route>
    </Routes>

  );
}

export default App
