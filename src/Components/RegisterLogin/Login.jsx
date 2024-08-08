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
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import { createCtx } from '../../Pages/Context';
  import 'react-toastify/dist/ReactToastify.css';
  import { notify } from '../toastUtils';

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


const chackUserExists=async (email)=>{
    const response=await axios.get("http://localhost:3000/users")
    
    
    const user=response.data.find((user1)=>user1.email===email)
    localStorage.setItem("id",user.id)
    return response.data.find((user)=>user.email===email) !== undefined;
  }


    const {values,handleBlur,handleChange,handleSubmit, errors}=useFormik({
        initialValues:initiolvalue,
        validationSchema:signupValidation, 
        onSubmit:async(values)=>{
            console.log(values);
            
            if(await chackUserExists(values.email)){
              notify("login complited success fully", "success")
              
               navigate('/')
        
            }else{
                notify("account not found","error")
            }

        }
    })

  return (
    <div className='flex justify-center' >
    <form onSubmit={handleSubmit}>
       <Card  className="w-96  ">
         <CardHeader
           variant="gradient"
           color="yellow"
           className="mb-4 grid h-28 place-items-center"
         >
           <Typography variant="h3" color="black">
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
           <Button variant="gradient" fullWidth color='yellow' type='submit'>
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
             >
               Sign Up
             </Typography>
             <Button variant="gradient" className='m-3' type='submit' color='yellow' onClick={()=>navigate(-1)}>Back</Button>
           </Typography>
         </CardFooter>
       </Card>
       </form>


    </div>
  )
}

export default Login