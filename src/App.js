import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Products from './Component/Products';
import MyCart from './Component/MyCart';
import { useEffect, useState } from 'react';
import Registration from './Component/Registration';
import Login from './Component/Login';
import React from 'react';

export default function App() {

  const [loggedDetails, setLoggedDetails] = useState()

  const logOutFunction = () => {
    localStorage.removeItem('loggedInUserData')
  }

  useEffect(() => {
    let detail = (JSON.parse(localStorage.getItem('loggedInUserData')))
    setLoggedDetails(detail)
  }, [])

  return (
    <BrowserRouter>
      <ul>
        {/* <li><Link to = '/' >Home</Link></li> */}
        <li><Link to='/Registration'>Registration</Link></li>
        <li><Link to='/MyCart'>MyCart</Link></li>
        <Link to='/Login'></Link>
        <Link to='/Login' onClick={logOutFunction} className={(loggedDetails ? 'logOut' : 'logoutError')} >Log Out</Link>
      </ul>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/MyCart' element={<MyCart />} />
        <Route path='/Registration' element={<Registration />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}