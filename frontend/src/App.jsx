import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Verify from './pages/Verify/Verify'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Footer from './components/Footer/Footer';
import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {

const [showLogin,setShowLogin]=useState(false)

  return (
    <>
    {showLogin ?<LoginPopup setShowLogin={setShowLogin}/> : null}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/Verify' element={<Verify/>} />
        <Route path='/myorders' element={<MyOrders/>} />
      </Routes>
    </div>
    <Footer />
  </>
  )
}

export default App
