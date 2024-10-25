import React, { useContext, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
  import { useFormik } from 'formik';
  import * as yup from 'yup'
  import { Link, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import { createCtx } from '../../Pages/Context';
  import 'react-toastify/dist/ReactToastify.css';
  import { notify } from '../toastUtils';
  import { RiAdminFill } from "react-icons/ri";

  const signupValidation=yup.object({
    email:yup.string().email("please Enter Valid email").required("please enter email"),
    password:yup.string().min(5).required("please enter password")
    
  })

 
  
  
  const initiolvalue={
      email:"",
      password:""
  }     

const Login = () => {
    let navigate=useNavigate()

    const {values,handleBlur,handleChange,handleSubmit, errors}=useFormik({
        initialValues:initiolvalue,
        validationSchema:signupValidation, 
    onSubmit:async(values)=>{
     try{
      const response = await axios.post("http://localhost:5000/api/users/login",{
        email:values.email,
        password:values.password
      });
        
      if(response.status===200){
        const {tocken,user}=response.data;

        localStorage.setItem('tocken',tocken)
        localStorage.setItem('user',JSON.stringify(user))

        navigate('/');
        notify('login complite successfully','success');
      }
     }catch(error){
        notify("Invalid email or password", "error")
        console.log(error,'this is errorelkjl');
        
     }
     
        }
    })

  return (
    <div className='flex justify-center' >
    <form onSubmit={handleSubmit}>
       <Card  className="w-96  bg-yellow-500 ">
         <CardHeader
           variant="gradient"
           color="gray"
           className="mb-4 grid h-28 place-items-center"
         >
           <Typography variant="h3" color="white">
             Sign In
           </Typography>
         </CardHeader>
         <CardBody className="flex flex-col gap-4" >
           <Input label="Email" size="lg"
            name='email' type='email' 
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            />
            {errors.email&& <small>{errors.email}</small>}
           <Input label="Password" size="lg"
            name='password' type='password'
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            />
             {errors.password&& <small>{errors.password}</small>}
   
           <div className="-ml-2.5">
             <Checkbox label="Remember Me" />
           </div>
         </CardBody>
         <CardFooter className="pt-0">
           <Button variant="gradient" fullWidth color='gray' type='submit'>
             Submit
           </Button>
           <Typography variant="small" className="mt-6 flex justify-center">
             Don&apos;t have an account?
             <Typography
               as="a"
               href="#signup"
               variant="small"
               color="blue-gray"
               className="ml-1 font-bold"
               onClick={()=>navigate('/Regisrter')}
             >
               Sign Up 
             </Typography>
           
             <Button variant="gradient" className='m-3' type='submit' color='gray' onClick={()=>navigate(-1)}>Back</Button>

           </Typography> 
           <button className=''> <Link to='/adminlogin'><RiAdminFill /> </Link></button>
         </CardFooter>
       </Card>
       </form>


    </div>
  )
}

export default Login