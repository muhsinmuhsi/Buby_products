
import React from "react";

const ProductModal=({product,isOpen,onClose})=>{

 if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{product.title}</h2>
              <button onClick={onClose} className="text-red-500 hover:text-red-700">
                &times; {/* Close Button */}
              </button>
            </div>
            <div className="mt-4">
              <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded-md" />
              <p className="mt-4 text-gray-700">{product.description}</p>
              <p className="mt-2 text-lg font-semibold">Price: ₹{product.price}</p>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      );
    };


    export default ProductModal