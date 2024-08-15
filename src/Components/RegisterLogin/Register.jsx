import React from 'react'
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
import { notify } from '../toastUtils';


const signupValidation=yup.object({
  name:yup.string().min(3).required("please enter name"),
  email:yup.string().email("please Enter Valid email").required("please enter email"),
  password:yup.string().min(5).required("please enter password"),
  cpassword:yup.string().oneOf([yup.ref("password")], "password not matched").required("please enter confirm password")
})

const chackUserExists=async (email)=>{
  const response=await axios.get("http://localhost:3000/users")
  
  return response.data.find((user)=>user.email===email) !== undefined;
}

const initiolvalue={
    name:"",
    email:"",
    password:"",
    cpassword:"",
    Cart:[],
    orders:[],
    orderedProducts:[]
    

}

const Register = () => {

  let navigate=useNavigate()
   const {values,handleBlur,handleChange,handleSubmit, errors}=useFormik({
        initialValues:initiolvalue,
        validationSchema:signupValidation, 
        // validate:async (values)=>{
        //   const errors={};
        //   if(await chackUserExists(values.email)){
        //     errors.email='user already exists';
            
        //   }
        // },
        onSubmit: async(values)=>{
           if(await chackUserExists(values.email)){
            notify("user already exist","warn")
           }else{
            notify("sign up completed","success")
            navigate("/Login")
            const newItem={...values,Cart:[]}
            axios.post('http://localhost:3000/users',newItem)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
           }
            

        }
    })
  
  return (
   
    <div className='flex justify-center' >

 <form onSubmit={handleSubmit}>
    <Card  className="w-96 bg-yellow-500 ">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign Up
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4" >
      <Input label="User name" 
      size="lg" name='name'
      value={values.name}
      onBlur={handleBlur}
      onChange={handleChange}
      />
       {errors.name&& <small>{errors.name}</small>}
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
        <Input label="confirm Password" size="lg" 
        name='cpassword' type='password'
        value={values.cpassword}
        onBlur={handleBlur}
        onChange={handleChange}
        />
         {errors.cpassword&& <small>{errors.cpassword}</small>}

        <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth type='submit'>
          Submit
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Already have an account?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Sign In
          </Typography>
        </Typography>
        <Button variant="gradient" className='m-3' type='submit' onClick={()=>navigate(-1)}>Back</Button>
      </CardFooter>
    </Card>
    </form>
  

    </div>

  )
}

export default Register

