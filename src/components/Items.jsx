import React, { useEffect, useState } from 'react';
import Item from './Item.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { getLatestProducts } from '../apis/apiCall.jsx';

const Items = () => {
  const [latestFits, setLatestFits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      setLoading(true);
      try {
        const products = await getLatestProducts();
                if (products && Array.isArray(products)) {
          setLatestFits(products);
        } else {
          setLatestFits([]); 
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLatestFits([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProducts();
  }, []);

  return (
    <div className="w-full py-16 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {loading ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-gray-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {latestFits.length > 0 ? (
                latestFits.map((item, index) => (
                  <motion.div
                    key={item._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex justify-center"
                  >
                    <Item
                      itemId={item._id}
                      image={item.image}
                      title={item.name}
                      price={item.price}
                    />
                  </motion.div>
                ))
              ) : (
         
                <div className="col-span-full text-center py-20 text-gray-500">
                  <p className="text-xl">No products found at the moment.</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Items;