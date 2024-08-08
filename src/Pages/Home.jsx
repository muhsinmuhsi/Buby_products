import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Header/Navbar'
import AOS from 'aos';
import 'aos/dist/aos.css' 
import { Link } from 'react-router-dom';
import Footer from '../Components/Footr';






const Home = () => {

  useEffect(()=>{
    AOS.init({duration:2000})
  },[])

  
    
  return (
<div>
    {/* home head settion -------------------------*/}
       <div   className= ' bg-yellow-400 '>
      <div>
        <Navbar/>
      </div>

      
        
      <div class="  bg-white 
         rounded-full drop-shadow-[0px_15px_3px_rgba(0,0,0,0.25)] absolute -bottom-40 left-1 w-[650px] h-[650px] hidden md:inline-block">
      </div>

  <div>
     <img className=' relative ' src='https://websitedemos.net/baby-store-04/wp-content/uploads/sites/750/2020/12/baby-store-hero-baby-img.png'/>
  </div>
{/* data-aos="fade-down" */}
    <div data-aos="fade-down"  className='inline  absolute bottom-20 right-5 drop-shadow-[0px_15px_3px_rgba(0,0,0,0.25)]  '>
      <h1 className='text-5xl  font-extrabold  '>Baby Essential Fashion <br /> & Nursery</h1>
    </div>

    <div className='p-10'>
      <p className=' text-wrap block '>
      Fermentum, cursus ultrices porttitor tincidunt suscipit quam facilisis sit <br /> massa pellentesque mi quis elit elementum tristique urna. <br />
    <br />
    * Enim cras quam et nullam risus nec tincidunt mattis nunc.
      </p>
    </div>
     
     <div className='align-middle'>
      <Link to="/shop"><button className='bg-red-400 rounded p-3 ml-52 mb-6 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300' >Shope Now</button></Link>

      
     
     


     </div>
        
        
    </div>


{/* offers section ----------------------=----------*/}
    <div>
    <Footer/>
    </div>

    

</div>
   
  )
}

export default Home