import { Card, typography, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const UserDetails = () => {
    const navigate=useNavigate()
   const { id } = useParams();
   const [details, setDetails] = useState(null);

   useEffect(() => {
      getUsers();
   }, []);

   const getUsers = async () => {
      try {
         const res = await axios.get(`http://localhost:3000/users/${id}`);
         setDetails(res.data);
      } catch (err) {
         console.log(err, "error to fetch data in userdetails");
      }
   };

   if (!details) {
      return <div>Loading.....</div>;
   }

   return (
      <>
         <nav className="bg-gradient-to-r from-blue-700 to-indigo-700  p-4 text-white">
            <div className="container mx-auto flex justify-between">
               <div className="text-lg font-semibold">Admin Panel</div>
               <div>
                  <button onClick={()=>navigate(-1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
               </div>
            </div>
         </nav>

         <div className='text-center my-8'>
            <Card className='text-white bg-gradient-to-r from-blue-700 to-indigo-700 p-6 max-w-xl mx-auto rounded-lg shadow-lg'>
               <Typography variant='h4' className="mb-4">
                  {details.name}'s Details
               </Typography>

               <Typography className="mb-2">
                  <span className="font-semibold">Email:</span> {details.email}
               </Typography>

               <Typography className="mb-2">
                  <span className="font-semibold">Password:</span> {details.password}
               </Typography>

               <Typography className="mb-2">
                  <span className="font-semibold">Number:</span> {details.orders.namber}
               </Typography>

               <Typography variant='h5' className="mt-6 mb-4">
                  {details.name}'s Ordered Products
               </Typography>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {details.orderedProducts&&details.orderedProducts.map((item, index) => (
                     <Card key={index} className="bg-white p-4 rounded-lg shadow-lg">
                        <img src={item.images} alt={item.name} className='w-full h-64 object-cover mb-4 rounded-md'/>
                        <Typography className="text-gray-800 font-semibold">
                           {item.name}
                        </Typography>
                     </Card>
                  ))}
                  {details.orderedProducts&&details.orderedProducts.length==0?<Typography variant='h6'>No OrderedProducts Yet</Typography>:null}
               </div>

               <Typography variant='h6' className="mt-4">
                  Total Products: {details.orderedProducts&&details.orderedProducts.length}
               </Typography>
            </Card>
         </div>
      </>
   )
}

export default UserDetails;
