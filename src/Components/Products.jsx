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

const Products = () => {
  const { productslist, setproductlist, setCart, addToCart, setserachTerm, searchTerm } = useContext(createCtx);
  const [catogery, setcatogery] = useState(productslist);

  const filterItems = (cartitem) => {
    const updateItems = productslist.filter((items) => items.category === cartitem);
    setcatogery(updateItems);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((res) => {
        setproductlist(res.data);
        setcatogery(res.data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, [setproductlist]);

  useEffect(() => {
    if (searchTerm) {
      const searchResult = productslist.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setcatogery(searchResult);
    } else {
      setcatogery(productslist);
    }
  }, [searchTerm, productslist]);

  return (
    <div className="">
      <Navbar />
      <div className="bg-yellow-500 w-full h-auto m-3 flex justify-center space-x-4">
        <button className="p-3 hover:bg-red-500" onClick={() => setcatogery(productslist)}>All</button>
        <button className="p-3 hover:bg-red-500" onClick={() => filterItems("Toys")}>Toys</button>
        <button className="p-3 hover:bg-red-500" onClick={() => filterItems("Clothing")}>Clothing</button>
        <button className="p-3 hover:bg-red-500" onClick={() => filterItems("Feeding")}>Feeding</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5">
        {catogery.map((items, index) => (
          <Card key={index} className="hover:scale-105 duration-200">
            <CardHeader shadow={true} floated={false} className="h-60">
              <img
                src={items.images}
                alt="card-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <Typography color="blue-gray" className="font-medium">
                  {items.name}
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
    </div>
  );
}

export default Products;
