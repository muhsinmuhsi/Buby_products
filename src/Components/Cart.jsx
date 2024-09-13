import React, { useContext, useEffect, useState } from 'react';
import { createCtx } from '../Pages/Context';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton
} from "@material-tailwind/react";
import Navbar from './Header/Navbar';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { notify } from './toastUtils';
import Footer from './Footr';
import { Link } from 'react-router-dom';

const Cart = () => {

  const [cartiteams, setCartIteam] = useState([])
  useEffect(() => {
    async function adddtocart() {
      try {
        const user = localStorage.getItem("id")
        const res = await axios.get(`http://localhost:3000/users/${user}`)
        const data = res.data.Cart
        setCartIteam(Object.values(data))
      } catch (err) {
        console.log("errrr");

      }
    }

    adddtocart()

    
    
  }, [])

  const GrandTotal=cartiteams.reduce((total,items)=> total + items.stock_quantity* items.price,0)

  console.log(GrandTotal,"grandtotal");

  const RemoveHandle = async (item) => {
    let user = localStorage.getItem("id")
    const removed = cartiteams.filter((items) => items.id !== item)

    try {
      await axios.patch(`http://localhost:3000/users/${user}`, { Cart: removed })
      setCartIteam(removed)
      notify("item removed success fully", "success")

    } catch (err) {
      console.log(err);

    }


  }

  const increaseQuantity = async (itemsId) => {

    const userId = localStorage.getItem("id")
    setCartIteam((prevItems) =>
      prevItems.map((item) =>
        item.id === itemsId ? { ...item, stock_quantity: item.stock_quantity + 1 } : item
      )
    );
    // console.log(cartiteams,"incresequntiy");

    await axios.patch(`http://localhost:3000/users/${userId}`, { Cart: cartiteams })

  }




  // try{
  //    if(userId){
  //   const increas=cartiteams.find((val)=>val.id===item)
  //  const updatedItem=[...cartiteams,increas.stock_quantity+1]
  //  console.log(updatedItem);



  // } catch(err){
  //   console.log(err,"error to increase quntity");


  // }



  const decreasequntity = async (id) => {
    let user = localStorage.getItem("id")
    setCartIteam((preveItems) =>
      preveItems.map((items) =>
        items.id === id && items.stock_quantity > 1 ? { ...items, stock_quantity: items.stock_quantity - 1 } : items
      )
    );
    await axios.patch(`http://localhost:3000/users/${user}`, { Cart: cartiteams })
  }

  

  return (
    <>

      <div className='bg-yellow-400 ' >
        <Navbar />
        <Typography variant="h1" color="white" className="mb-2 text-center bg-black rounded">Shopping  Cart</Typography>
        <div className=' '>


          {cartiteams && cartiteams.map((items, index) => (
            <div key={index} className='  '>

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
                  <div className='flex items-center'>
                    <IconButton
                      variant='outlined'
                      size='sm'
                      onClick={() => decreasequntity(items.id)}
                    >
                      <MinusIcon className='w-4 h-4' />
                    </IconButton>
                    <Typography className='mx-2'>{items.stock_quantity}</Typography>
                    <IconButton
                      variant='outlined'
                      size='sm'
                      onClick={() => increaseQuantity(items.id)}
                    >
                      <PlusIcon className='w-4 h-4' />
                    </IconButton>
                    <IconButton
                      variant='outlined'
                      size='sm'
                      color='red'
                      onClick={() => RemoveHandle(items.id)}
                      className='ml-2'
                    >
                      <TrashIcon className='w-4 h-4' />
                    </IconButton>
                  </div>

                  {/* <Button className='m-3 inline-block'>Buy Now</Button> */}
                  <Typography className='m-2'>
                    ₹{items.price * items.stock_quantity}
                    {/* ${calculateTotalPrice(items.quantity, items.price)} */}
                  </Typography>
               
                </CardFooter>
              </Card>

            </div>
          ))}
          {cartiteams.length>0? 
          <div className=' flex justify-center text-center' >
            <Card >
              <CardBody>
                <Typography variant='h4'>
                  Total <hr></hr> <br />
                </Typography>

                <Typography variant='small'>
                Your order is eligible for FREE Delivery.<br></br> Choose FREE Delivery option at checkout <br /> <br />
                <input type="checkbox" /> This order contains a gift <br /> <br />
                </Typography>

                <Typography variant='h4' >
                  Sub total ({cartiteams.length} items)<b>₹{GrandTotal}</b>
                </Typography>
                <br />
               <Link to={'/Payment'}><Button className=''>Proceed To Buy</Button></Link>
              </CardBody>
            </Card>
           
          </div>:
          <div>
            <Typography variant='h4' className='text-center'>your cart is empty !</Typography>
          </div>
          }
          


        </div>

      </div>
      

      <Footer />

    </>
  );
};

export default Cart;


