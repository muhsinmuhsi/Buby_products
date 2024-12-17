import React, { useContext } from 'react'
import Navbar from '../Components/Header/Navbar'
import Footer from '../Components/Footr'
import axios from 'axios'
import {createCtx} from './Context'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";

const Catogeryproducts = () => {

    const {productcatrogery,addToCart}=useContext(createCtx)

    console.log(productcatrogery[0].category,'this product catogeory ');
    

  return (
    <div className='bg-yellow-200'>
   <Navbar/>
     <div className='p-8'>
        <h1 className='text-center  font-bold text-4xl shadow-lg '>{productcatrogery[0].category==='Feeding'?"Feeding":productcatrogery[0].category==='clothing'?'baby clothes':productcatrogery[0].category}</h1>
     </div>  
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 mb-5" >
        {productcatrogery.map((items, index) => (
          <Card key={index} className="hover:scale-105 duration-200" >
            <CardHeader shadow={true} floated={false} className="h-60" >
              {/* <button className='p-1 inline-block' onClick={()=>wishlisthandle(items._id)}>{Array.isArray(wishlist) && wishlist.find((item) => item.productId._id === items._id)
             ? <FaHeart />
             : <FiHeart />}
              </button>  */}
              <img
                src={items.image}
                alt="card-image"
                className="h-full w-full object-cover"
                // onClick={()=>viewbyid(items)}
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
 

   <Footer/>

    </div>
  )
}

export default Catogeryproducts