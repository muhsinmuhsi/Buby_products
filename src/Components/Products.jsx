import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from 'axios';
import { createCtx } from '../Pages/Context';
import Navbar from './Header/Navbar';
import Footer from './Footr';
import { FiHeart } from "react-icons/fi";
import ProductModal from './Productmodal';
import { FaHeart } from "react-icons/fa";

const Products = () => {
  //feching from context
  const { productslist, setproductlist, setCart, addToCart, setserachTerm, searchTerm ,addAndDeletWishlist,
    wishlistdeleteHandle,setiswishlist,iswishlist} = useContext(createCtx);
  const [catogery, setcatogery] = useState(productslist);
  const [ismodalopen,setismodalopen]=useState(false)
  const [product,setproduct]=useState(null)
  const [wishlist,setwishlist]=useState([])
  const [fake,setfake]=useState(false)

  //product filter
  const filterItems = (cartitem) => {
    const updateItems = productslist.filter((items) => items.category === cartitem);
    setcatogery(updateItems);
  };

  const tocken = localStorage.getItem('tocken');

  const closemodel=()=>{
    setismodalopen(false);
  }

 useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/products", {
          headers: {
            Authorization: ` ${tocken}`
          }
        });
        setproductlist(response?.data?.data);
         
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [setproductlist, tocken]);

  useEffect(() => {
    if (searchTerm) {
      const searchResult = productslist.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setcatogery(searchResult);
    } else {
      setcatogery(productslist);
    }
  }, [searchTerm, productslist]);

  const viewbyid=async (product)=>{
    console.log(product._id,'this is id');
    let id = product._id;
    
    try {
      const product=await axios.get(`http://localhost:5000/api/users/products/${id}`,{
      headers:{
        Authorization:`${tocken}`
      }
    })
    setproduct(product.data.product)
    setismodalopen(true)

    } catch (error) {
      console.log(error);
      
    }
    
  }

  useEffect(()=>{
    getwishlist()
  },[fake])

  const getwishlist=async()=>{
    const userlocalStorage=localStorage.getItem('user')
    const userId=JSON.parse(userlocalStorage)
    const tocken=localStorage.getItem('tocken')
    try {
      const res=await axios.get(`http://localhost:5000/api/users/${userId._id}/wishlist/`,{
         headers:{
          Authorization:`${tocken}`
         }
      })
      setwishlist(Array.isArray(res.data) ? res.data : []);
      console.log(wishlist,'tis from getwishlist');
      
      console.log(res.data,'this from getwishlist products');
      
    } catch (error) {
      console.log(error,'error to fetch wishlist');
      
    }
  }
  const wishlisthandle=(itemsId)=>{
    addAndDeletWishlist(itemsId)
    setfake(!fake)
  }


  return (

    //header
    <div className="bg-yellow-100">
      <Navbar />
      <div className="bg-yellow-200 w-full h-auto m-3 flex justify-center space-x-4">
        <button className="p-3 hover:bg-red-500" onClick={() => setcatogery(productslist)}>All</button>
        <button className="p-3 hover:bg-red-500" onClick={() => filterItems("Toys")}>Toys</button>
        <button className="p-3 hover:bg-red-500" onClick={() => filterItems("clothing")}>Clothing</button>
        <button className="p-3 hover:bg-red-500" onClick={() => filterItems("Feeding")}>Feeding</button>
      </div>
 
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5" >
        {catogery.map((items, index) => (
          <Card key={index} className="hover:scale-105 duration-200" >
            <CardHeader shadow={true} floated={false} className="h-60" >
              <button className='p-1 inline-block' onClick={()=>wishlisthandle(items._id)}>{Array.isArray(wishlist) && wishlist.find((item) => item.productId._id === items._id)
             ? <FaHeart />
             : <FiHeart />}
              </button> 
              <img
                src={items.image}
                alt="card-image"
                className="h-full w-full object-cover"
                onClick={()=>viewbyid(items)}
              />
            </CardHeader>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <Typography color="blue-gray" className="font-medium">
                  {items.title}
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  {items.price}
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75"
              >
                {items.description}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                onClick={() => addToCart(items)}
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none hover:bg-yellow-500 focus:scale-105 focus:shadow-none active:scale-100"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Footer />
      <ProductModal isOpen={ismodalopen} onClose={closemodel} product={product}/>
    </div>
  );
}

export default Products;
