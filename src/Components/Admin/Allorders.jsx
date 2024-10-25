import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Allorders = () => {
    const [allorder, setallorders] = useState([])

    useEffect(() => {
        getorders();
    }, []);  // Run only once on mount

    const getorders = async () => {
        const token = localStorage.getItem('tocken')
        try {
            const res = await axios.get('http://localhost:5000/api/admin/orders', {
                headers: {
                    Authorization: `${token}`
                }
            })
            setallorders(res.data)
            console.log(res.data, 'This is all orders from the server');
        } catch (err) {
            console.log(err, 'Error fetching data');
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">All Orders</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Number</th>
                        <th className="py-2 px-4 border">Products</th>
                        <th className="py-2 px-4 border">Paid amount</th>
                    </tr>
                </thead>
                <tbody>
                    {allorder.map((item, index) => (
                        <tr key={item._id}>
                            <td className="py-2 px-4 border">{index + 1}</td>
                            <td className="py-2 px-4 border">
                                {item.productId && item.productId.map((product) => (
                                    <div key={product._id}>
                                        {product.title}
                                    </div>
                                ))}
                            </td>
                            <td className="py-2 px-4 border-b">{item.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Allorders;
