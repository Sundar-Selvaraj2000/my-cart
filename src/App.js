import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Products from './Component/Products';
import MyCart from './Component/MyCart';
import { addCart } from './Component/Products';
import { useState } from 'react';
function App() {

  const [cartData, setCartData] = useState([])

  const getCartData = (data)=>{
    setCartData(data)
  }

  return (
    <div>
        <BrowserRouter>
        <ul>
        {/* <li><Link to = '/' >Home</Link></li> */}
          <li><Link to = '/Products' >Products</Link></li>
          <li><Link to = '/MyCart'>MyCart</Link></li>
        </ul>
        <Routes>
          <Route path = '/Products' element={<Products />} />
          <Route path ='/MyCart' element={<MyCart />} />
        </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
