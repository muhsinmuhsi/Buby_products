import axios from 'axios';
import React, { useState } from 'react'
import { notify } from '../toastUtils';
import { number } from 'yup';

const AddProducts = () => {
  const[newproduct,setnewproducts]=useState({
    name: '',
    description: '',
    price: number,
    category: '',
    images: '',
});

const isIdExiste=async(id)=>{
  try{
    const res=await axios.get('http://localhost:3000/products')
  const data=res.data
    return data.some((item)=>item.id===id)
  }catch(err){
    console.log(err,"error to fetch id's");
    
  }
  
}

const handleChange=(e)=>{
  const {name,value}=e.target;
    setnewproducts({...newproduct,[name]:value})
}

const handleSubmit=async (e)=>{
  e.preventDefault();
  try{
   const res= await axios.post("http://localhost:3000/products",newproduct)
    console.log(res.data);
    notify("product added success fully",'success')
    
  }catch(err){
    console.log(err,'faild to add products');
    notify("somthig wrong,product not added","warn")
  }
  setnewproducts("");
}
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-4">
                {/* <label className="block text-gray-700">Product Id</label>
                    <input
                        type="text"
                        name="id"
                       value={newproduct.id}
                       onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    /> */}

                    <label className="block text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="name"
                       value={newproduct.name}
                       onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={newproduct.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={newproduct.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Category</label>
                    <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     name="category" 
                     value={newproduct.category}
                     onChange={handleChange}
                     required
                    
                    >
                      <option value="">select</option>
                      <option value="Feeding">Feeding</option>
                      <option value="clothes">clothes</option>
                      <option value="Toys">Toys</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Product Link</label>
                    <input
                        type="text"
                        name="images"
                       value={newproduct.images}
                       onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Product
                </button>
            </form>
        </div>
  )
}

export default AddProducts