import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import NestedModal from './EditModal'; // Import the NestedModal component

const EditProducts = () => {
  const [openParent, setOpenParent] = useState(false); // State for modal visibility
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [productId,setproductId]=useState()

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await axios.get(`http://localhost:3000/products`);
    setAllProducts(response.data);
    setCategory(response.data);
  }

  const filterProducts = (items) => {
    const updatedItems = allProducts.filter((val) => {
      return val.category === items;
    });
    setCategory(updatedItems);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      setCategory(allProducts.filter((items) => items.id !== productId));
    } catch (err) {
      console.log(err, 'failed to delete products');
    }
  };

  const edithandle=(id)=>{
    setOpenParent(true);
    setproductId(id)
  }
  const updateProductList = () => {
    getProducts();
  };

  return (
    <>
      <div className='bg-blue-500 w-full h-auto m-3 flex justify-center '>
        <button className='p-3 hover:bg-blue-700' onClick={() => setCategory(allProducts)}>All</button>
        <button className='p-3 hover:bg-blue-700' onClick={() => filterProducts("Toys")}>Toys</button>
        <button className='p-3 hover:bg-blue-700' onClick={() => filterProducts("Clothing")}>Clothing</button>
        <button className='p-3 hover:bg-blue-700' onClick={() => filterProducts("Feeding")}>Feeding</button>
      </div>
      <div className='flex flex-wrap gap-4'>
        {category && category.map((items) => {
          return (
            <div key={items.id}>
              <Card className="w-96 h-auto">
                <CardHeader shadow={true} floated={false} className="h-60">
                  <img 
                    src={items.images}
                    alt="card-image"
                    className="h-full w-full object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardBody className="h-24 overflow-hidden">
                  <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                      {items.name}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      ${items.price}
                    </Typography>
                  </div>
                  <Typography variant="small" color="gray" className="font-normal opacity-75">
                    {items.description}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex justify-between">
                  <Button className="m-3 bg-blue-500 hover:bg-blue-800" onClick={() => deleteProduct(items.id)}>Delete</Button>
                  <Button className="m-3 bg-blue-500 hover:bg-blue-800" onClick={() => edithandle(items.id)}>Edit</Button>
                </CardFooter>
              </Card>
            </div>
          )
        })}
      </div>
      {openParent && <NestedModal
       openParent={openParent}
       setOpenParent={setOpenParent}
      productId={productId}
      updateProductList={updateProductList}
      />} {/* Render the modal */}
    </>
  );
};

export default EditProducts;
