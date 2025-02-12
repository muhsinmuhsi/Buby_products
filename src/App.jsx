import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './Components/Products'
import { Context } from './Pages/Context'
import Register from './Components/RegisterLogin/Register'
import Login from './Components/RegisterLogin/Login'
import Cart from './Components/Cart'
import { ToastContainer } from 'react-toastify';
import Payment from './Pages/Payment'
import Orders from './Pages/Orders'
import AdminHome from './Pages/AdminHome'

import UserDetails from './Components/Admin/UserDetails'

import Wishlist from './Components/Wishlist'
import AdminLogin from './Components/Admin/AdminLogin'
import Catogeryproducts from './Pages/Catogeryproducts'




function App() {


  return (
    <>
    <div className=''>
      <ToastContainer/>
<Context>
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/admin/:id' element={<AdminHome/>}/>
  <Route path='/shop' element={<Products/>}/>
  <Route path='/Regisrter' element={<Register/>}/>
  <Route path='/Login' element={<Login/>}/>
  <Route path='/Cart' element={<Cart/>}/>
  <Route path='/Payment' element={<Payment/>}/>
  <Route path='/Orders' element={<Orders/>}/>
  {/* <Route path='/allusers' element={<AllUsers/>}/>
  <Route path='/addproducts' element={<AddProducts/>}/>
  <Route path='/Editproducts' element={<EditProducts/>}/> */}
  <Route path='Userdetails/:id' element={<UserDetails/>}/> 
  {/* <Route path='/EditModal' element={<NestedModal/>}/>
  <Route path='/Allorders' element={<Allorders/>}/>
  <Route path='/productid' element={<Productmodal/>}/> */}
  <Route path='/wishlist' element={<Wishlist/>}/>
  <Route path='/adminlogin' element={<AdminLogin/>}/>
  <Route path='products/Catogery' element={<Catogeryproducts/>}/>




</Routes>
  </BrowserRouter>
</Context>

    </div>
    </>
  )
}

export default App
