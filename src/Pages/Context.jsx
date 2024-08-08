import React, { createContext,useEffect,useReducer,useState} from 'react'
import Products from '../Components/Products'
import Reducer from './Reducer'
import axios from 'axios'
import { notify } from '../Components/toastUtils'

export const createCtx=createContext()

 export const Context = ({children}) => {
    const[productslist,setproductlist]=useState([])
    const [filtereditem,setfiltereditem]=useState([])
   const[searchTerm,setserachTerm]=useState("")
    const[Cart,setCart]=useState([])
    const [user,setuser]=useState([])
const userId =   localStorage.getItem("id")

    
useEffect(()=>{
      if(userId){
      axios.get(`http://localhost:3000/users/${userId}`)
        .then((response)=>setCart(response.data.Cart ||[])) 
        .catch((errer)=>console.log(errer))
       
      }else{
        notify("please login","warn")
      }
    },[userId,Cart]);

    const addToCart= async(cartProduct)=>{
 
   try{
   

    // const res =await axios.get(`http://localhost:3000/users/${userss}`)
    // const cart = res.data.Cart
    


    const productExists=  Cart.some(item=> item.id ===cartProduct.id );

    if(!productExists){
      const updatedcart=[...Cart,cartProduct];
      setCart(updatedcart)
      console.log(Cart);
      

      await axios.patch(`http://localhost:3000/users/${userId}`,{Cart:updatedcart})
    }

   
   }catch(err){
    console.log('error add to cart',err);
   }
     
   
    }

  return (
    <div>
  <createCtx.Provider value={{productslist,setproductlist,filtereditem,setfiltereditem,
    setCart,Cart,addToCart,user,setuser,searchTerm,setserachTerm}}>
      {children}
  </createCtx.Provider>

    </div>
  )
}

