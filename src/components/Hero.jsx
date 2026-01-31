import React from 'react'
import HeroImage from '../assets/HeroImage.png'
import { useNavigate } from 'react-router-dom'
const Hero = () => {
  const navigate = useNavigate();

  return (
   <div className='relative w-full h-[70vh] mb-12 overflow-hidden'>
      <img className='w-full h-full object-cover' src={HeroImage} alt="Hero" />
      <div className='absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white p-4'>
        <h2 className='text-5xl md:text-7xl font-extrabold tracking-tighter mb-4'>NEW SEASON</h2>
        <p className='text-lg md:text-xl mb-8 opacity-90'>Elevate your style with our latest drops.</p>
        <button onClick={()=>navigate("/men")} className='px-8 py-3 bg-white text-black font-semibold hover:bg-gray-200 transition-all'>
          SHOP NOW
        </button>
      </div>
    </div>
  )
}

export default Hero
