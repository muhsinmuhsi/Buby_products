import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [allorders,setallorders]=useState([])
  
  useEffect(() => {
    const getData = async () => {
      const tocken=localStorage.getItem('tocken')
      const resUsers = await axios.get("http://localhost:5000/api/admin/viewAllUsers",{
        headers:{
          Authorization:`${tocken}`
        }
      });
      setUsers(resUsers.data);
      
      const resProducts = await axios.get("http://localhost:5000/api/admin/products",{
        headers:{
          Authorization:`${tocken}`
        }
      });
      setProducts(resProducts.data);

      const allorder = await axios.get("http://localhost:5000/api/admin/orders",{
        headers:{
          Authorization:`${tocken}`
        }
      });
      setallorders(allorder.data)

    };
    getData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-3 gap-4 text-white">
        <div className="bg-indigo-500 p-4 shadow rounded-lg">
          <h2 className="text-xl  font-bold mb-2">Total Users</h2>
          <p className="text-2xl">{users.length}</p>
          <p className="text-sm">Recent: {users[users.length - 1]?.username || "N/A"}</p>
        </div>
        <div className="bg-indigo-500 p-4 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-2">Total Products</h2>
          <p className="text-2xl">{products.length}</p>
          <p className="text-sm">Recent: {products[products.length - 1]?.title || "N/A"}</p>
        </div>
        <div className="bg-indigo-500 p-4 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-2">Total Orders</h2>
          <p className="text-2xl">{allorders.length}</p>
          <p className="text-sm">last order: {products[allorders.length - 1]?.title   || "N/A"}</p>
        </div>
      </div>  
      {/* Quick Links Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="flex space-x-4">
        <Link to={'/admin/users'}><button className="bg-blue-500 text-white px-4 py-2 rounded">All User</button></Link>  
        <Link to={'/admin/addproducts'}> <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button></Link>  
        <Link to={'/admin/Allorders'}> <button className="bg-blue-500 text-white px-4 py-2 rounded">View Orders</button></Link> 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
