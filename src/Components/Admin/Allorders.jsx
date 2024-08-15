import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Allorders = () => {
    const [allorder, setallorders] = useState([])

    useEffect(() => {
        getorders();
    }, []);  // Run only once on mount

    const getorders = async () => {
        try {
            const res = await axios.get('http://localhost:3000/selledProducts')
            setallorders(res.data)
        } catch (err) {
            console.log(err, 'error to fetch data');
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">All Orders</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Image</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {allorder.map((item) => (
                        <tr key={item.id}>
                            <td className="py-2 px-4 border-b">{item.id}</td>
                            <td className="py-2 px-4 border-b">
                                <img src={item.images} alt={item.name} className="h-12 w-12 object-cover" />
                            </td>
                            <td className="py-2 px-4 border-b">{item.name}</td>
                            <td className="py-2 px-4 border-b">{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Allorders
