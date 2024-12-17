import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetails = ({ onClose, userId, userdetails }) => {
   const [details, setDetails] = useState(null);

   useEffect(() => {
      // Fetch user details when userId changes and userdetails is true (modal is open)
      const getUsers = async () => {
         const tocken = localStorage.getItem('tocken');
         console.log(tocken,'this is tocken frmo ')
         try {
            const res = await axios.get(`http://localhost:5000/api/admin/user/${userId}`, {
               headers: {
                  Authorization: `${tocken}`,
               },
            });
            setDetails(res.data);
         } catch (err) {
            console.error('Error fetching user details:', err);
         }
      };

      if (userId && userdetails) {
         getUsers();
      }
   }, [userId, userdetails]);

   if (!userdetails) return null; // Don't render if modal is not open
   if (!details) return <div>Loading...</div>; // Display loading while waiting for data

   return (
      <Dialog open={userdetails} onClose={onClose} maxWidth="md" fullWidth>
         <DialogTitle className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center">
            {details.username}'s Details
         </DialogTitle>

         <DialogContent className='bg-gradient-to-r from-blue-700 to-indigo-700'>
            <Card className="text-center p-6  max-w-xl mx-auto rounded-lg shadow-lg">
               <Typography variant="h6" className="mb-4 bg-blue-gray-100 rounded-full">
                  <span className="font-semibold">Email:</span> {details.email}
               </Typography>

               <Typography variant="h5" className="mt-6 mb-4">
                  {details.username}'s Ordered Products
               </Typography>

               <div className="flex flex-col items-center">
                  {details.orders && details.orders.map((item, index) => (
                     <Card key={index} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 w-3/4">
                        <Typography className="font-semibold mb-2">ORDER.NO {index + 1}</Typography>
                        {item.productId && item.productId.map((product) => (
                           <div key={product._id} className="flex justify-between p-2 mb-2 bg-white rounded-lg shadow">
                              <div className="flex flex-col">
                                 <span className="font-semibold text-black">{product.title}</span>
                                 <span>Price: ${product.price}</span>
                              </div>
                              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                           </div>
                        ))}
                        <Typography className="text-gray-800 font-semibold mt-2">
                           Total Price: ${item.totalPrice}
                        </Typography>
                     </Card>
                  ))}
                  {details.orders && details.orders.length === 0 && (
                     <Typography variant="body1" className="mt-4">No Ordered Products Yet</Typography>
                  )}
               </div>

               <Typography variant="body1" className="mt-4">
                  Total Products: {details.orders && details.orders.length}
               </Typography>
            </Card>
         </DialogContent>

         <DialogActions>
            <Button onClick={onClose} variant="contained" color="primary">Close</Button>
         </DialogActions>
      </Dialog>
   );
};

export default UserDetails;
