import React, { useEffect, useState } from 'react'
import Item from './Item.jsx'
import Pant from '../assets/pant.png'
import Pajama from '../assets/pajama.png'
import TShirt from '../assets/tshirt.png'
import Sweater from '../assets/sweater.png'
import { motion, useAnimationFrame } from 'framer-motion'
import { getLatestProducts } from '../apis/apiCall.jsx'


const Items = () => {
  const [latestFits , setLatestFits] = useState([]);
  
  useEffect(()=>{
    const fetchLatestProducts = async ()=>{
      const products = await getLatestProducts();
      setLatestFits((prevProducts) => [...products]);
    }
    fetchLatestProducts();
  }, [])

  return (
   <div className="w-full py-10 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {latestFits?.map((item) => (
          <Item
            key={item._id}
            itemId={item._id}
            image={item.image}
            title={item.name}
            price= {item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default Items
