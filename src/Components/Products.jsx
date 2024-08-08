import React, { useContext, useEffect, useState} from 'react'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  } from "@material-tailwind/react";
import axios from 'axios';
import { createCtx } from '../Pages/Context';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import Navbar from './Header/Navbar';
import Footer from './Footr';


  
  const Products = () => {
    const{productslist,setproductlist,setCart,user,setuser,addToCart,setserachTerm,searchTerm}=useContext(createCtx)
    const[catogery,setcatogery]=useState(productslist)
   
    const filterItems=(cartitem)=>{
      const updateItems=productslist.filter((items)=>{
        return items.category===cartitem
      });
      setcatogery(updateItems)
      
    }

   
    

     useEffect(()=>{
    axios.get("http://localhost:3000/products")
    .then((res)=>{
       setproductlist(res.data)
       setcatogery(res.data)
    })
    .catch((err) => {
      console.error('Error fetching products:', err);
    });
  },[setproductlist])

  useEffect(()=>{
    if(searchTerm){
      const searchResult=productslist.filter((product)=>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setcatogery(searchResult)
    } else{
      setcatogery(productslist)
    }
  },[searchTerm,productslist])

  // const handleclick=(val)=>{
  //   addToCart(val);
    // setuser(val.id)
    // console.log(val);
    // console.log(val.id);
  
    return (
      <div className=''>
         <Navbar/>
        <div className='bg-yellow-500 w-full h-auto m-3 flex justify-center '>
         <button  className='p-3 hover:bg-red-500' onClick={()=>setcatogery(productslist)}>All</button>
         <button  className='p-3 hover:bg-red-500' onClick={()=>filterItems("Toys")}>Toyse</button>
         <button  className='p-3  hover:bg-red-500' onClick={()=>filterItems("Clothing")}>Clothse</button>
         <button className='p-3  hover:bg-red-500'  onClick={()=>filterItems("Feeding")}>Feeding</button>
         
        </div>
        

      <div  className='flex flex-wrap justify-around mx-5'>
    {/* //--------------------------------------------------------------------- */}

   {catogery.map((items,index)=>{
    return(
      <Card className="w-96 h-96 hover:scale-105 duration-200">
      <CardHeader shadow={true} floated={false} className="h-96">
        <img
          src={items.images}
          alt="card-image"
          className="h-full w-full object-cover "
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
           {items.name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
          {items.price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {items.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button

        onClick={()=>addToCart(items)}

          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none hover:bg-yellow-500 focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
    )
   })}

   
         
      </div>
      <Footer/>
     </div>
    )
  }
  
  export default Products
   
  