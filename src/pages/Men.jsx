import React, { useEffect, useState } from 'react';
import Item from '../components/Item';
import { getProductsByCategoryMen } from '../apis/apiCall';

const Men = () => {
  const [menProducts, setMenProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const products = await getProductsByCategoryMen();
        console.log("men products:" , products);
        setMenProducts(products);
      } finally {
        setLoading(false);
      }
    };
    fetchMenProducts();
  }, []);

  return (
    <div className='max-w-7xl mx-auto px-4 py-12'>
      {/* Page Header */}
      <div className='flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-8'>
        <div>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900'>Men's Collection</h1>
          <p className='mt-2 text-lg text-gray-500'>Discover the latest trends in men's fashion.</p>
        </div>
        <span className='text-sm text-gray-400 font-medium uppercase mt-4 md:mt-0'>
          {menProducts.length} Products Found
        </span>
      </div>


      {loading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
          {menProducts.length > 0 ? (
            menProducts.map((item) => (
              <Item 
                key={item._id} 
                itemId={item._id} 
                image={item.image} 
                title={item.name} 
                price = {item.price}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-400 italic">No products found in this category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Men;