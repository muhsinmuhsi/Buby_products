import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { number } from 'yup';
import { notify } from '../toastUtils';

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  padding: '16px',
  zIndex: 1000,
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 999,
};


function NestedModal({ openParent, setOpenParent,productId, updateProductList }) {
 const [allProducts,setproducts]=useState([])
 const [image,setimage]=useState(null)
  
  
//  useEffect(()=>{
//   getprodut();
//  },[productId])
  

  
  const {values,handleBlur,handleChange,handleSubmit, setValues}=useFormik({
    initialValues:{
          title: '',
          description:'',
          category:'',
          price: number,
    },


    onSubmit: async (values) => {
      const tocken=localStorage.getItem('tocken')

      const formData=new FormData();
      formData.append('title',values.title);
      formData.append('description',values.description);
      formData.append('price',values.price);
      formData.append('category',values.category)
      if(image){
        formData.append('image',image)
      }

      console.log("Submitting values:", values);
      try {
          await axios.put(`http://localhost:5000/api/admin/products/edit/${productId}`,formData,{
            headers:{
              Authorization:`${tocken}`,
              "Content-Type": "multipart/form-data",
            }
          });
          console.log("Product updated successfully");
          updateProductList();
          setOpenParent(false)
          notify('product updated successfully','success')
      } catch (err) {
          console.log(err, "error to update product");
      }
  },
});
    
   
  

useEffect(() => {
  const getProduct = async () => {
    const tocken=localStorage.getItem('tocken')
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/products/${productId}`,{
        headers:{
          Authorization:`${tocken}`
        }
      });
      setValues(res.data);
      setproducts(res.data)
    } catch (err) {
      console.log(err);
    }
  };
  getProduct();
}, [productId, setValues]);

const handleImageChange=(e)=>{
  setimage(e.target.files[0]);

}
  

  return (
    <>
      {openParent && (
       <>
        <div style={overlayStyle} onClick={() => setOpenParent(false)}></div>
<div style={modalStyle} className='flex flex-row  rounded justify-around'>
    <div className=''>
         <h2>Edit The Product</h2>
         <hr />
         <form onSubmit={handleSubmit}>
         <div className="mb-4">

         {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
             Product Id
           </label>
           <input
             id="id"
             type="text"
             name='id'
             value={values.id}
             onChange={handleChange}
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           />
          */}
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
             Product Name
           </label>
           <input
             id="name"
             type="text"
             name='name'
             value={values.title}
             onChange={handleChange}
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           />

         </div>
         <div className="mb-4">
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
             Price
           </label>
           <input
             id="price"
             type="text"
             name='price'
             value={values.price}
             onChange={handleChange}
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           />

         {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
             quantity
           </label>
           <input
             id="price"
             type="text"
             name='stock_quantity'
             value={values.stock_quantity}
             onChange={handleChange}
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           /> */}

       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
             category
           </label>
           <input
             id="category"
             type="text"
             name='category'
             value={values.category}
             onChange={handleChange}
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           />
         </div>

         <div className="mb-4">
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
             Description
           </label>
           <textarea
             id="description"
             name='description'
             value={values.description}
             onChange={handleChange}
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           />

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
             change image
           </label>
           <input
             id="price"
             type="file"
            name='image'
            onChange={handleImageChange}    
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           />
         </div>
      

         <div className="flex justify-end">
           <button
             onClick={() => setOpenParent(false)}
             className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
           >
             Cancel
           </button>
           <button
           type='submit'
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           >
             Save
           </button>
         </div>
        </form>
    </div>   

    <div className='w-44 h-44  '> 
       <img src={allProducts.images} alt="" />
    </div>

</div>
     </>
      )}
    </>
  );
}

export default NestedModal;
