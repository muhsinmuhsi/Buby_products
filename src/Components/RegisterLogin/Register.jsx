import React, { useState } from 'react'
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


const signupValidation = yup.object({
  username: yup.string().min(3).required("Please enter name"),
  email: yup.string().email("Please enter valid email").required("Please enter email"),
  password: yup.string().min(5).required("Please enter password"),
  cpassword: yup.string().oneOf([yup.ref("password")], "Password does not match").required("Please enter confirm password"),
});

// const chackUserExists = async (email) => {
//   const response = await axios.get("");
//   return response.data.find((user) => user.email === email) !== undefined;
// };

const initialValues = {
  username: "",
  email: "",
  password: "",
  cpassword: "",  // Add this missing value
};

const Register = () => {
  const [profileimage, setProfile] = useState(null);
  let navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: signupValidation,

    onSubmit: async (values) => {
      // const userExists = await chackUserExists(values.email);
      // if (userExists) {
      //   notify("User already exists", "error");
      //   return;
      // }

      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (profileimage) {
        formData.append("image", profileimage); 
      }

      console.log('this is usernamefrom formmik',values.username);
      

      try {
        const response = await axios.post("http://localhost:5000/api/users/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        notify(response.data.message, "success");
        navigate("/Login");
      } catch (error) {
        notify(error.response.data.message, "error");
      }
    },
  });

  const handleImageChange = (e) => {
    setProfile(e.target.files[0]);
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <Card className="w-96 bg-yellow-500">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white" >
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Username"
              size="lg"
              name="username"
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.name && <small>{errors.username}</small>}
            <Input
              label="Email"
              size="lg"
              name="email"
              type="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.email && <small>{errors.email}</small>}
            <Input
              label="Password"
              size="lg"
              name="password"
              type="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.password && <small>{errors.password}</small>}
            <Input
              label="Confirm Password"
              size="lg"
              name="cpassword"
              type="password"
              value={values.cpassword}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.cpassword && <small>{errors.cpassword}</small>}
            <Input
              label="Upload Profile Image"
              size="lg"
              name="image"
              type="file"
              onChange={handleImageChange}
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Submit
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                href="/Login"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
               
              >
                Sign In
              </Typography>
            </Typography>
            <Button variant="gradient" className="m-3" onClick={() => navigate(-1)}>
              Back
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Register;


