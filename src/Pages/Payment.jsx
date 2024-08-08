import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import { Button, Card, CardBody, Typography } from '@material-tailwind/react'
import Footer from '../Components/Footr';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdHome } from "react-icons/md";
import { notify } from '../Components/toastUtils';

const Payment = () => {
  const[orderdetails,setorderdetails]=useState({
    name: '',
    namber:'',
    country:'',
    pinCode:'',
    address:'',
    landmark:'',
    area:'',
    city:'',
    state:'',
    payment:''
    
  })
    const[orderedProducts,setOrderedProducts]=useState([])
    
    const userId=localStorage.getItem("id")
    useEffect(()=>{
        async function  getvalue(){
            const response = await axios.get(`http://localhost:3000/users/${userId}`)
            const data = response.data.Cart
           
            setOrderedProducts(data)
        } 
        getvalue();
  
     
       
    
    },[]) 

    const Handlechange=(e)=>{
      const { name, value } = e.target;
      setorderdetails({
        ...orderdetails,
        [name]:value
      });
      
    }

    const Handlesubmit= async (e)=>{
      e.preventDefault();
      
      try{
        const response=await axios.patch(`http://localhost:3000/users/${userId}`,{orders:orderdetails})
        console.log(response.data,"data posted successfully");
      }
      catch(error){
        console.log(error,"data post");
        
      }
      
      
    }

    const payproceed= async()=>{
      try{
        const res=await axios.patch(`http://localhost:3000/users/${userId}`,{orderedProducts:orderedProducts})
        notify("payment complited ","info")
      }catch(arr){
        console.log(arr);
        
      }

    }
    
    const GarandTotal=orderedProducts.reduce((total,items)=>total + items.stock_quantity* items.price,0)

    // console.log(cartProducts,"cartproducts");


    return (
        <>
          <div className='flex flex-row justify-between flex-wrap h-14 bg-yellow-500'>
            <img src={logo} alt="Logo" />
            <Typography variant='h1' color='black' className=''>Checkout</Typography>
           <Link to={'/'}> <div className='mx-5 my-3'><MdHome className='size-8'/></div></Link>
          </div>
     <div>
         <Typography className='text-center p-3' variant='h5'> Enter your Details Heare</Typography>
    </div>
    <div className='flex justify-around m-4 flex-wrap'>
   
        
          <div className='w-1/2 p-3 border border-gray-200 items-center bg-gray-50'>
           <form action="" onSubmit={Handlesubmit}>
            <label htmlFor="country/region">Country/Region</label>
            <select 
            name='country'
            value={orderdetails.country}
            onChange={Handlechange}
            className="block appearance-none w-full bg-gray-200 border border-gray-200
             text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white
             focus:border-gray-500" id="country/region">
              <option value="India">India</option>
              <option value="United state (us)">United state (us)</option>
              <option value="England">England</option>
              <option value="Aostroliya">Aostroliya</option>
              <option value="Thiland">Thiland </option>
              <option value="Jappan"></option>
              <option value="Chaina"></option>
              <option value="swizzer land">Swizzer land</option>
            </select>
    
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="full-name">
              Full Name (first and last)
            </label>
            <input name='name'  
            value={orderdetails.name}
            onChange={Handlechange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="full-name" type="text" placeholder="Name" />
    
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone-number">
              Phone Number
            </label>
            <input 
             name='namber'  
             value={orderdetails.namber}
             onChange={Handlechange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="phone-number" type="text" placeholder="Phone Number" />
    
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pin-code">
              Pin Code
            </label>
            <input
            name='pinCode'  
             value={orderdetails.pinCode}
             onChange={Handlechange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="pin-code" type="text" placeholder="Pin Code" />
    
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address-1">
              Flat, House no., Building, Company, Apartment
            </label>
            <input
             name='address'  
             value={orderdetails.address}
             onChange={Handlechange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address-1" type="text" placeholder="Address" />
    
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address-2">
              Area, Street, Sector, Village
            </label>
            <input
             name='area'  
             value={orderdetails.area}
             onChange={Handlechange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address-2" type="text" placeholder="Address" />
    
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="landmark">
              Landmark
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="landmark" type="text" placeholder="e.g. near Apollo Hospital" />
    
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                  City
                </label>
                <input
                  name='city'  
                 value={orderdetails.city}
                 onChange={Handlechange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="city" type="text" placeholder="Albuquerque" />
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
                  State
                </label>
                <div className="relative">
                  <select 
                    name='state'  
                   value={orderdetails.state}
                   onChange={Handlechange}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="state">
                    <option value="Kerala" >Kerala</option>
                    <option value="Thamil Nadu">Thamil Nadu </option>
                    <option value="Karnadaka">Karnadaka</option>
                    <option value="Orisa">Orisa</option>
                    <option value="kashmeer">kashmeer</option>
                  </select>
                </div>
                
              </div>
            </div>
            <label htmlFor="readio"> UPI </label>
                <input type="radio"
                 name='payment'
                 value="upi"
                 checked={orderdetails.payment === 'upi'}
                 onChange={Handlechange}
                 />&nbsp; &nbsp; 

                <label htmlFor="readio"> credit/debit </label>
                <input type="radio" 
                name='payment'
                value="credit/debit"
                checked={orderdetails.payment ==='credit/debit'}
                onChange={Handlechange}
                />&nbsp; &nbsp; 

                <label htmlFor="readio">Cod(Cash On Delivery)</label>&nbsp; 
                <input type="radio"
                 name='payment'
                 value='cod'
                 checked={orderdetails.payment === 'cod'}
                 onChange={Handlechange}
                 />&nbsp; 
                 <Button className='ml-7' type='submit'>submit</Button>
         </form>
          </div>


          <div className=' flex justify-center text-center  h-auto' >
            <Card>
              <CardBody>
                <Typography variant='h4'>
                  Total <hr></hr> <br />
                </Typography>

                <Typography variant='small'>
                Your order is eligible for FREE Delivery.<br></br> Choose FREE Delivery option at checkout <br /> <br />
                <input type="checkbox" /> This order contains a gif <br /> <br />
                </Typography>

                <Typography variant='h4' >
                  Sub total ({orderedProducts.length} items)<b>₹{GarandTotal}</b>
                </Typography>
                <br />
               <Link to={''}><Button className='' onClick={payproceed}>pay now </Button></Link>
              </CardBody>
            </Card>
           
          </div>

          
    </div>  
    <div className='flex justify-center'>
      <div>

      
        {/* <Button>pay</Button> */}
       </div>
       <br /><br />
    </div>
    <Footer/>
    
        </>
      );
}

export default Payment