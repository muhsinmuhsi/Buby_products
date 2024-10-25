import axios from 'axios';
import React, { useState } from 'react'
import { notify } from '../toastUtils';
import { number } from 'yup';
import Swal from 'sweetalert2';

const AddProducts = () => {
  const[newproduct,setnewproducts]=useState({
    title: '',
    description: '',
    price: number,
    category: '',
    image:null
})

const handleChange=(e)=>{
  const {name,value,files}=e.target;
    setnewproducts({...newproduct,[name]:files? files[0] :value})
}

const handleSubmit=async (e)=>{
  const tocken=localStorage.getItem('tocken')
  e.preventDefault();
  console.log(newproduct.category,'this is new product from addroduct');
  
  try{

    const formData=new FormData()
    formData.append('title',newproduct.title)
    formData.append('description',newproduct.description)
    formData.append('price',newproduct.price)
    formData.append('category',newproduct.category)

    if(newproduct.image){
      formData.append('image',newproduct.image)
    }else{
      Swal.fire({
        text:'please select an image to upload',
        icon:'warning',
        confirmButtonText:'ok'
      });
      return;
    }
   const res= await axios.post("http://localhost:5000/api/admin/createproducts",formData,{
    headers:{
      Authorization:`${tocken}`
    }
   })
    console.log(res.data);
    notify(`${res.data.messege}`,'success')
    
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

                    <label className="block text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="title"
                       value={newproduct.title}
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
                      <option value="clothing">clothes</option>
                      <option value="Toys">Toys</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Product Link</label>
                    <input
                        type="file"
                        name="image"  
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