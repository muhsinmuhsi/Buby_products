import react from 'react'
import './App.css'
import Navbar from './Components/Header/Navbar'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './Components/Products'
import { Context } from './Pages/Context'
import Register from './Components/RegisterLogin/Register'
import Login from './Components/RegisterLogin/Login'
import Find from './Components/Find'
import Cart from './Components/Cart'
import { ToastContainer } from 'react-toastify';
import Payment from './Pages/Payment'
import Orders from './Pages/Orders'



function App() {


  return (
    <>
    <div className=''>
      <ToastContainer/>
<Context>
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/shop' element={<Products/>}/>
  <Route path='/Regisrter' element={<Register/>}/>
  <Route path='/Login' element={<Login/>}/>
  <Route path='/Find' element={<Find/>}/>
  <Route path='/Cart' element={<Cart/>}/>
  <Route path='/Payment' element={<Payment/>}/>
  <Route path='/Orders' element={<Orders/>}/>


</Routes>
  </BrowserRouter>
</Context>

    </div>
    </>
  )
}

export default App
