import React, { createContext,useEffect,useReducer,useState} from 'react'
import Products from '../Components/Products'
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
const [openParent, setOpenParent] = useState(false);

    
useEffect(()=>{
  const getprodut= async ()=>{
    try{
      if(userId){
      axios.get(`http://localhost:3000/users/${userId}`)
        .then((response)=>setCart(response.data.Cart ||[])) 
        .catch((errer)=>console.log(errer))
        }

    }catch(err){
      console.log(err,'error to fetch data');
    }
  }
  getprodut()
      
    },[userId]);


    const addToCart= async(cartProduct)=>{
     if(!userId){
      notify("Please Login",'warn')
      return;
     }
   try{
    


    const productExists=  Cart.some(item=> item.id ===cartProduct.id );

    if(!productExists){
      const updatedcart=[...Cart,cartProduct];
      setCart(updatedcart)
      console.log(Cart);
      

      await axios.patch(`http://localhost:3000/users/${userId}`,{Cart:updatedcart})
      notify("product added to cart ","success")
    }else{
      notify("product alredy exist",'warn')
    }
    
   
   }catch(err){
    console.log('error add to cart',err);
   }
     
   
    }
  

  return (
    <div>
  <createCtx.Provider
      value={{
        productslist,
        setproductlist,
        filtereditem,
        setfiltereditem,
        setCart,
        Cart,
        addToCart,
        user,
        setuser,
        searchTerm,
        setserachTerm,
        openParent,
        setOpenParent,
      }}
    >
      {children}
    </createCtx.Provider>

    </div>
  )
}

