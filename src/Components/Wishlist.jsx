import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Header/Navbar';
import { Card, CardBody, CardHeader,Typography } from '@material-tailwind/react';
import Footer from './Footr';
import { notify } from './toastUtils';

const Wishlist = () => {
    const [wishlist,setwishlist]=useState([])
    const [iswishlist,setiswishlist]=useState(false)

    useEffect(()=>{
        async function viewWishlist(){
            const userlocalStorage=localStorage.getItem('user');
            const user=JSON.parse(userlocalStorage)
            const tocken=localStorage.getItem('tocken')
         try{
            const response=await axios.get(`http://localhost:5000/api/users/${user._id}/wishlist`,{
                headers:{
                    Authorization:`${tocken}`
                }
            })
            setwishlist(response.data)
            console.log('this is wishlist',response.data);
            

         }catch(error){
            console.log(error,'error to fetch wishlist');
            
         }
            
        }
        viewWishlist()
    },[])

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
            }catch(error){
                console.log(error,'error to delete');
                
            }
    }

    
  return (
    <>
    <div className='bg-yellow-200 '>
        <Navbar/>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-5 mb-7 mt-5 '>
       {wishlist&&wishlist.map((items,index)=>(
        
        <Card key={index} className="">
            <CardHeader shadow={true} floated={false} className="h-60">
            <img
                src={items.productId.image}
                alt="card-image"
                className="h-full w-full object-cover"
              />

            </CardHeader>
            <CardBody>
            <div className="mb-2 flex items-center justify-between">
                <Typography color="blue-gray" className="font-medium">
                  {items.productId.title}
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  {items.productId.price}
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75"
              >
                {items.productId.description}
              </Typography>
            </CardBody>

        </Card>
       
       ))}
   </div>
   <Footer/>
    </div>
    </>
  )
}

export default Wishlist