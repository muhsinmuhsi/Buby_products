import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Components/Header/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footr';
import clothes from '../assets/clothscatogery2.jpg';
import Feeding from '../assets/feedingcarogey.jpg';
import Toys from '../assets/tyoscatogry2.jpg';
import slideimage1 from '../assets/Green Cute Baby Store Facebook Ads.png';
import slideimage2 from '../assets/Blue Modern New Kids Fashion Facebook Ads.png';
import slideimage3 from '../assets/Blue Cute Handdrawn New Summer Collection Kids Banner.png';
import { createCtx } from './Context';
import SimpleImageSlider from "react-simple-image-slider";
import adsimage1 from '../assets/Blue White Playful New Collection Kids Fashion Sale Instagram Post.png'
import adsimage2 from '../assets/Purple New Collection for Kids Vibrant Instagram Post.png'


const Home = () => {
  const { buywithcatogery } = useContext(createCtx);
  const [catogery, setcatogery] = useState([]);
  const [sliderDimensions, setSliderDimensions] = useState({ width: 1256, height: 550 });

  const navigate=useNavigate()

  useEffect(() => {
    AOS.init({ duration: 2000 });
    
    // Adjust slider dimensions based on screen size
    const handleResize = () => {
      if (window.innerWidth < 640) { // Mobile screens
        setSliderDimensions({ width: 320, height: 200 });
      } else if (window.innerWidth < 1024) { // Tablet screens
        setSliderDimensions({ width: 640, height: 360 });
      } else { // Desktop screens
        setSliderDimensions({ width: 1256, height: 550 });
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = [
    { url: slideimage1 },
    { url: slideimage2 },
    { url: slideimage3 }
  ];

  return (
    <div>
      {/* Home Header Section */}
      <div className="bg-blue-200">
        <Navbar />
        <div className="flex justify-center  my-2 " onClick={()=>navigate('/shop')}>
          <SimpleImageSlider
          className="sm:my-2"
            width={sliderDimensions.width}
            height={sliderDimensions.height}
            images={images}
            showBullets={true}
            showNavs={true}
            autoPlay={true}
            autoPlayDelay={6.0}
          />
        </div>

        {/* Introduction Text */}
        <div className="p-10 text-center">
          <p className="text-wrap hidden sm:block text-2xl">
            Your one-stop destination for unique, high-quality baby essentials and apparel. <br /> Discover handpicked collections designed to bring comfort, style, and joy to every baby’s journey.
          </p>
          {/* <Link to="/shop">
            <button className="bg-red-400 rounded p-3 mt-4 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
              Shop Now
            </button>
          </Link> */}
        </div>
      </div>

      {/* Shop by Category */}
      <div data-aos="fade-up" className="m-4 border border-black">
        <h1 className="text-center font-bold text-4xl p-3">Shop by Category</h1>
        <div className="flex flex-wrap gap-4 justify-around md:flex-row sm:flex-col">
          <Link to={'products/Catogery'}>
            <div className="text-center" onClick={() => buywithcatogery('clothing')}>
              <img src={clothes} alt="" className="w-32 h-32 rounded-full" />
              <span className="font-serif text-2xl">Cloths</span>
            </div>
          </Link>
          <Link to={'products/Catogery'}>
            <div className="text-center" onClick={() => buywithcatogery('Feeding')}>
              <img src={Feeding} alt="" className="w-32 h-32 rounded-full" />
              <span className="font-serif text-2xl">Feeding</span>
            </div>
          </Link>
          <Link to={'products/Catogery'}>
            <div className="text-center" onClick={() => buywithcatogery('Toys')}>
              <img src={Toys} alt="" className="w-32 h-32 rounded-full" />
              <span className="font-serif text-2xl">Toys</span>
            </div>
          </Link>
        </div>
      </div>

      <div className='bg-blue-200 m-6 rounded flex justify-around p-5' data-aos="fade-up">
        <p className='text-wrap font-serif text-2xl text-center inline-block'>"Where every little step begins with love – discover quality,<br /> comfort, and style, crafted just for your little one."</p>
        <button className='inline-block bg-blue-400 rounded p-2 font-serif text-2xl transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300 ' onClick={()=>navigate('/shop')}>shop now </button>
      </div>


      <div className='flex flex-col  sm:flex-row p-3 gap-5  ' >
        <div className='p-2 border border-black' data-aos="fade-up" onClick={()=>navigate('/shop')}>
         <img src={adsimage1} alt="" className=''/>
        </div>

        <div className='border border-black p-2 ' data-aos="fade-up" onClick={()=>navigate('/shop')}>
          <img src={adsimage2} alt=""  />
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
