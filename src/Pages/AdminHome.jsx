import React from 'react';
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { TbLocationQuestion } from "react-icons/tb";
import { Link, useParams } from 'react-router-dom';
import Dashbord from '../Components/Admin/Dashbord';
import AllUsers from '../Components/Admin/AllUsers';
import EditProducts from '../Components/Admin/EditProducts';
import AddProducts from '../Components/Admin/AddProducts';
import UserDetails from '../Components/Admin/UserDetails';
import Allorders from '../Components/Admin/Allorders';
import { IoIosLogOut } from "react-icons/io";
import { notify } from '../Components/toastUtils';

const AdminHome = () => {
    const { id } = useParams();
    console.log(id, "usparams3");

    const Logouthandle=async()=>{
      try {
        localStorage.clear()

        notify('logout complite successfuly')

      } catch (error) {
        console.log('error to logout');
      }
    }

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-700 to-indigo-700 p-5 text-white z-10">
                <div className="container mx-auto flex justify-between">
                    <div className="text-lg font-semibold">Admin Panel</div>
                    <div>
                        <Link to={'/'}>
                            <button className='bg-blue-500 hover:bg-blue-700 rounded px-4 py-2'>
                                Home
                            </button>
                        </Link>

                        <button className='bg-blue-500 hover:bg-blue-700 rounded px-4 py-2 ml-3' 
                        onClick={Logouthandle} ><IoIosLogOut className='inline'/> Logout </button>
                    </div>
                </div>
            </nav>

            <div className='flex mt-16'>
                <div className="fixed top-20 bottom-0 left-0 w-64 bg-gradient-to-r from-blue-700 to-indigo-700 text-white h-screen p-5 z-10">
                    <h2 className="text-2xl font-semibold mb-4">Menu</h2>
                    <ul>
                        <Link to={`/admin/dashbord`}>
                            <li className="mb-2 hover:text-gray-400 flex items-center">
                                <MdDashboard className="mr-2" /> Dashboard
                            </li>
                        </Link>
                        <hr />
                        <Link to={'/admin/users'}>
                            <li className="mb-2 hover:text-gray-400 flex items-center">
                                <FaUsers className="mr-2" /> Users
                            </li>
                        </Link>
                        <hr />
                        <Link to={'/admin/editproducts'}>
                            <li className="mb-2 hover:text-gray-400 flex items-center">
                                <MdOutlineProductionQuantityLimits className="mr-2" /> Edit Products
                            </li>
                        </Link>
                        <hr />
                        <Link to={'/admin/addproducts'}>
                            <li className="mb-2 hover:text-gray-400 flex items-center">
                                <MdAddShoppingCart className="mr-2" /> Add Products
                            </li>
                        </Link>
                        <hr />
                        <Link to={'/admin/Allorders'}>
                            <li className="mb-2 hover:text-gray-400 flex items-center">
                                <TbLocationQuestion className="mr-2" /> All Orders
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className="ml-64 p-6 flex-1 overflow-auto h-screen">
                    {id === 'dashbord' ? <Dashbord /> :
                     id === 'users' ? <AllUsers /> :
                     id === 'editproducts' ? <EditProducts /> :
                     id === 'addproducts' ? <AddProducts /> :
                     id === 'trackorders' ? <Trackorder /> :
                     id === 'Userdetails/:id' ? <UserDetails /> : 
                     id==='Allorders'? <Allorders/>:null}
                </div>
            </div>
        </>
    );
}

export default AdminHome;
