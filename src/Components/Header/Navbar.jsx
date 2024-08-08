import React, { useContext, useEffect, useState } from 'react'
import logo from"../../assets/logo.svg"
import { Link } from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { createCtx } from '../../Pages/Context';
import { IoSearch } from "react-icons/io5";
import axios from 'axios';
import { IoCloseOutline } from "react-icons/io5";
import { RiUserFill } from "react-icons/ri";



const Navbar = () => {
  const [loggine,setIsloggin] =useState(false)
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const{Cart,setserachTerm}=useContext(createCtx)
    const [clicked,setclicked]=useState(false)
    const [cartiteams,setCartIteam]=useState([])

    useEffect(()=>{
      const user = localStorage.getItem("id")
      if(user){
       setIsloggin(true)
      }
 
 },[])
 
    useEffect(()=>{
        async function abc(){
           try{
            const user =localStorage.getItem("id")
            if(user){
            const res = await axios.get(`http://localhost:3000/users/${user}`)
            const data = res.data.Cart
            setCartIteam(Object.values(data))
            }
           }catch(err){
                console.log("errrr");
           }
        }
        abc()
    },[])

    function handleSugnout(){
      localStorage.clear("id")
      setIsloggin(false)
      notify("logout complite","warn")
    }

    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };

    const closeDropdown = () => {
      setDropdownVisible(false);
    };
  return (
    <div className='flex justify-around py-3 flex-wrap '> 
        <div >
         <a href='#'><img src={logo} alt='logo'/></a>
        </div>
        <div className=' hidden  md:flex' >
        <div className='m-2  '>
          
        <Link to="/" className='mr-5  hover:text-red-500 selection:text-white'> Home </Link> 
           <Link to="/shop" className='mr-5  hover:text-red-500'> Shope </Link>
           <Link className='mr-5  hover:text-red-500'> About Us </Link>
           <Link className='mr-5  hover:text-red-500'> Testimonial</Link>
           <Link className='mr-5  hover:text-red-500'> Contact Us </Link>
  
          </div>
        </div>
       
         <div>
       <input type="text" placeholder='search...'
       onChange={(e)=>setserachTerm(e.target.value)}
       className='hidden sm:hidden md:inline-block w-[200px] sm:w-[200px] hover:w-[300px] transition-all 
       duration-300 rounded-full border border-gray-300 px-2 py-1 
       foucus:outline-non focus:border-1 focus:border-red-500' 
       />
       <Link to="/shop"><button  className='p-1 m-1 rounded-full bg-yellow-200 hover:bg-yellow-700'><IoSearch /></button></Link> 

      <Link to="/Cart"><a className='inline-block mx-3' href=""><span className='w-4 h-4 bg-red-700 text-white text-sm rounded-full inline-block text-center absolute top-1'>{cartiteams.length}</span><IoCartOutline/></a></Link>
      
       <button className='inline-block mx-3' onClick={toggleDropdown} >{isDropdownVisible?<RiUserFill />:<FaRegUser/>}</button>

       {isDropdownVisible && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
            <button onClick={closeDropdown} className="block text-right px-4 py-2 text-sm text-gray-700">
            <IoCloseOutline />
            </button>
            {loggine?<div> <button onClick={handleSugnout} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
            <Link to={'/Orders'} className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
            </div>:
            <div>
            <Link to={'/Login'} className="block text-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
            <Link to={'/Regisrter'} className="block text-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</Link>  
           </div>}
        
          </div>
        )}

       <button className=' mx-5 md:hidden inline-block' onClick={()=>setclicked(!clicked)}>{clicked ?<MdClose/>:<IoMdMenu />}</button>


         </div>
         {clicked && (
            <div className='flex justify-center flex-wrap bg-slate-500  translate-x-1  w-[100vw]  h-[200px] bg-yellow-100' >
                <div className='m-2  '>
           <Link to="/" className='mr-5  hover:text-red-500 selection:text-white'> Home </Link> 
           <Link to="/shop" className='mr-5  hover:text-red-500'> Shope </Link>
           <Link className='mr-5  hover:text-red-500'> About Us </Link>
           <Link className='mr-5  hover:text-red-500'> Testimonial</Link>
           <Link className='mr-5  hover:text-red-500'> Contact Us </Link>
  
          </div>

            </div>
        )}
    </div>
       
  )
}

export default Navbar