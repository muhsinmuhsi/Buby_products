import axios from 'axios'
import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import { Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { MdHome } from "react-icons/md";
import {
    Card,
    CardBody,
    CardFooter
  } from "@material-tailwind/react";
import Footer from '../Components/Footr'

const Orders = () => {
    const[complitedOrders,setCO]=useState([{}])

    useEffect(()=>{
       const userlocalstorage=localStorage.getItem("user")
       const user=JSON.parse(userlocalstorage)
       const tocken=localStorage.getItem('tocken')
        async function getorders(){
           try{
const response= await axios.get(`http://localhost:5000/api/users/${user._id}/orders`,{
  headers:{
    Authorization:`${tocken}`
  }
})

        const orders=response.data
        setCO(orders);
        }catch(err){
            console.log(err);
        }  
        
        }
    getorders();
       
    },[])
     console.log(complitedOrders,"pawor");
  return (
    <div>
         <div className='flex flex-row justify-between flex-wrap h-14 bg-yellow-200'>
            <img src={logo} alt="Logo" />
            <Typography variant='h3' color='black' className=''>Camplited Orders</Typography>
           <Link to={'/'}> <div className='mx-5 my-3'><MdHome className='size-8'/></div></Link>
          </div>


          {complitedOrders&& complitedOrders.map((items,index)=>{
          return(
            <div>
<Card key={index} className='mb-4 flex-row flex-wrap  justify-around'>
  <CardBody className='p-4'>
    <Typography variant='h6' className='m-3' color='black'>Order : {index + 1}</Typography>

    {/* Loop through the productId array and display product titles */}
    {items.productId && items.productId.map((product, productIndex) => (
      <Typography key={productIndex} variant='small' color='black' className='m-3'>
        Product Name: {product.title}
      </Typography>
    ))}

    <Typography className='m-3' color='black'>Total Products: {items.productId?items.productId.length:0 }</Typography>
  </CardBody>

  <CardFooter className='flex items-center justify-between p-4'>
    <Typography className='m-2' color='green'>
      Paid ₹{items.totalPrice}
    </Typography>
  </CardFooter>
</Card>

            </div>
          )

          })}
          <Footer/>
    </div>
  )
}

export default Orders