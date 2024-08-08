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
       const userId=localStorage.getItem("id")
        async function getorders(){
           try{
const response= await axios.get(`http://localhost:3000/users/${userId}`)
        const orders=response.data.orderedProducts
        setCO(Object.values(orders));
       
        
        }catch(err){
            console.log(err);
            
        }  
        
        }
    getorders();
       
    },[])
     console.log(complitedOrders,"pawor");
  return (
    <div>
         <div className='flex flex-row justify-between flex-wrap h-14 bg-yellow-500'>
            <img src={logo} alt="Logo" />
            <Typography variant='h1' color='black' className=''>Camplited Orders</Typography>
           <Link to={'/'}> <div className='mx-5 my-3'><MdHome className='size-8'/></div></Link>
          </div>


          {complitedOrders&& complitedOrders.map((items,index)=>{
          return(
            <div>
<Card key={index} className='mb-4 flex-row flex-wrap  justify-around'>


<img src={items.images} alt={items.name} className='w-64 h-60 object-cover mr-4 m-4 rounded' />
<CardBody className='p-4'>
  <Typography variant='h5' className='m-3'>{items.name}</Typography>
  <Typography variant='small' color='gray' className='m-3'>
    {items.description}
  </Typography>

  <Typography className='m-3'>{items.details}</Typography>
  </CardBody>

  <CardFooter className='flex items-center justify-between p-4'>
  

  {/* <Button className='m-3 inline-block'>Buy Now</Button> */}
  <Typography className='m-2'>
    Paid ₹{items.price * items.stock_quantity}
    {/* ${calculateTotalPrice(items.quantity, items.price)} */}
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