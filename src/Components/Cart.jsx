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
  const {Cart,setCart}=useContext(createCtx)

  const [cartiteams, setCartIteam] = useState([]);

  const [fake,setfake]=useState(false)


  const GrandTotal = cartiteams?.reduce((total, items) => total + items.quantity * items.productId.price, 0)

  const RemoveHandle = async (item) => {
    let userlocalStorage = localStorage.getItem("user")
    const user=JSON.parse(userlocalStorage)
    const tocken=localStorage.getItem('tocken')
   
    try {
      await axios.delete(`http://localhost:5000/api/users/${user._id}/cart/${item}/remove`,{
        headers:{
          Authorization:`${tocken}`
        }
      })
      
      setfake(!fake)
      setCart(!Cart)
      notify("item removed success fully", "success")

    } catch (err) {
      console.log(err,'error to delete cart')
    }


  }

  const increaseQuantity = async (itemsId) => {
    const user= localStorage.getItem("user")
   const userId=JSON.parse(user)
    const tocken=localStorage.getItem('tocken')
    console.log('this is user tocken ',tocken);
    
    
    try {
    const response = await axios.patch(`http://localhost:5000/api/users/${userId._id}/cart/${itemsId}/increment`,{}, {
      headers: {
        Authorization: ` ${tocken}`
      }
    });
     console.log(response.data.messege,'muhsjks');

     setfake(!fake)
     
    } catch (error) {
      console.log(error,'error to increase quntity');
      
    }
  }


  const decreasequntity = async (itemsId) => {
    let user = localStorage.getItem("user")
    let userId=JSON.parse(user)
    let tocken=localStorage.getItem('tocken')

    await axios.put(`http://localhost:5000/api/users/${userId._id}/cart/${itemsId}/decrement`,{},{
      headers: {
        Authorization: ` ${tocken}`
      }
    })
    setfake(!fake)
  }

  useEffect(() => {
    async function cartview() {
      try {
        const user1 = localStorage.getItem("user")
        const user = JSON.parse(user1)
        const tocken = localStorage.getItem("tocken")

        const res = await axios.get(`http://localhost:5000/api/users/${user._id}/cart`, {
          headers: {
            Authorization: `${tocken}`
          }
        })

        const data = res.data
        console.log('this is cart product');

        setCartIteam(Array.isArray(data)?data:[])
      } catch (err) {
        console.log("errrr");

      }
    }

    cartview()
  }, [fake])


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const user1 = localStorage.getItem("user")
        const user = JSON.parse(user1)
        const tocken = localStorage.getItem("tocken")

    const scriptLoaded = await loadRazorpayScript();
 
    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
 
    // Step 1: Create order in backend
    const orderResult = await axios.post(`http://localhost:5000/api/users/payment/${user._id}`, {
      amount: cartiteams.reduce((acc, item) => acc + item.productId.price * item.quantity, 0), // Amount in INR
    },{
      headers:{
        Authorization:`${tocken}`
      }
    });
 
    const { amount, id: order_id, currency } = orderResult.data;
 
    const options = {
      key: "rzp_test_MHWmeOKrKTE7bB",
      amount: amount.toString(),
      currency: currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id,
      handler: async function (response) {
        // Step 2: Verify payment
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        
        console.log(paymentData);
 
        const verificationResult = await axios.post("http://localhost:5000/api/users/verifypayment", paymentData,{
          headers:{
            Authorization:`${tocken}`
          }
        });
 
   
          // Step 3: Save order
     
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
  setfake(!fake)
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
 
    rzp1.open();
   
  };

  setTimeout(() => {
    setfake(!fake)
  }, 5000);


  return (
    <>

      <div className='bg-yellow-200 ' >
        <Navbar />
        <Typography variant="h1" color="white" className="mb-2 text-center bg-black rounded">Shopping  Cart</Typography>
        <div className=' '>


          {cartiteams && cartiteams.map((items, index) => (
            <div key={index} className='  '>

              <Card key={index} className='mb-4 flex-row flex-wrap  justify-around'>



                <img src={items.productId.image} alt={items.productId.title} className='w-64 h-60 object-cover mr-4 m-4 rounded' />
                <CardBody className='p-4'>
                  <Typography variant='h5' className='m-3'>{items.productId.title}</Typography>
                  <Typography variant='small' color='gray' className='m-3'>
                    {items.productId.description}
                  </Typography>

                  {/* <Typography className='m-3'>{items.details}</Typography> */}
                </CardBody>

                <CardFooter className='flex items-center justify-between p-4'>
                  <div className='flex items-center'>
                    <IconButton
                      variant='outlined'
                      size='sm'
                      onClick={() => decreasequntity(items.productId._id)}
                    >
                      <MinusIcon className='w-4 h-4' />
                    </IconButton>
                    <Typography className='mx-2'>{items.quantity}</Typography>
                    <IconButton
                      variant='outlined'
                      size='sm'
                      onClick={() => increaseQuantity(items.productId._id)}
                    >
                      <PlusIcon className='w-4 h-4' />
                    </IconButton>
                    <IconButton
                      variant='outlined'
                      size='sm'
                      color='red'
                      onClick={() => RemoveHandle(items.productId._id)}
                      className='ml-2'
                    >
                      <TrashIcon className='w-4 h-4' />
                    </IconButton>
                  </div>

                  {/* <Button className='m-3 inline-block'>Buy Now</Button> */}
                  <Typography className='m-2'>
                    ₹{items.productId.price * items.quantity}
                    {/* ${calculateTotalPrice(items.quantity, items.price)} */}
                  </Typography>

                </CardFooter>
              </Card>

            </div>
          ))}
          {cartiteams.length > 0 ?
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
                  <Button className='' onClick={handlePayment}>Proceed To Buy</Button>
                </CardBody>
              </Card>

            </div> :
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


