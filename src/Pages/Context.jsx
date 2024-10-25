import React, { createContext,useEffect,useReducer,useState} from 'react'
import Products from '../Components/Products'
import axios from 'axios'
import { notify } from '../Components/toastUtils'

export const createCtx=createContext()

 export const Context = ({children}) => {
    const[productslist,setproductlist]=useState([])
    const [filtereditem,setfiltereditem]=useState([])
   const[searchTerm,setserachTerm]=useState("")
    const[Cart,setCart]=useState(false)
    const [user,setuser]=useState([])
    const [iswishlist,setiswishlist]=useState([])
    
const userfull =   localStorage.getItem("user")
const userId=JSON.parse(userfull)
const [openParent, setOpenParent] = useState(false);


    const addToCart= async(cartProduct)=>{
     if(!userId){
      notify("Please Login",'warn')
      return;
     }

   try{
      const tocken=localStorage.getItem('tocken')
    
       const response=await axios.post(`http://localhost:5000/api/users/${userId._id}/cart/${cartProduct._id}`,{}, {
        headers: {
          Authorization: ` ${tocken}`
        }
      });
      notify(`${response.data.messege}`,"success")
      setCart(!Cart)
   }catch(err){
    console.log('error add to cart',err);
   }
    }

    const addAndDeletWishlist= async (productId)=>{
      if(!userId){
        notify("please login",'warn')
      }
      const tocken=localStorage.getItem('tocken')

      try {
        const res=await axios.post(`http://localhost:5000/api/users/${userId._id}/wishlist/${productId}`,{},{
          headers:{
            Authorization:`${tocken}`
          }
        })
        
        notify(`${res.data.messege}`,'success')
        
      } catch (error) {
        console.log(error,'error to add to wishlist');
      }
    }


    const wishlistdeleteHandle=async(itemsId)=>{
      const userlocalStorage=localStorage.getItem('user');
          const user=JSON.parse(userlocalStorage)
          const tocken=localStorage.getItem('tocken')
          try{
             const res=await axios.delete(`http://localhost:5000/api/users/${user._id}/wishlist/${itemsId}/remove`,{
          headers:{
              Authorization:`${tocken}`
          }
      })
       notify(`${res.data.messege}`,'success')
       setiswishlist(false)  
          }catch(error){
              console.log(error,'error to delete');
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
        wishlistdeleteHandle,
        setiswishlist,
        iswishlist,
        addAndDeletWishlist
      }}
    >
      {children}
    </createCtx.Provider>

    </div>
  )
}

