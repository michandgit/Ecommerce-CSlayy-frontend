import React, { useEffect, useState } from 'react';
import Item from '../components/Item';
import { getProductsByCategoryWomen } from "../apis/apiCall";

const Women = () => {
    const [womenProducts, setWomenProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWomenProducts = async () => {
            try {
                const products = await getProductsByCategoryWomen();
                setWomenProducts(products);
            } catch (error) {
                console.error("Error fetching women products:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchWomenProducts();
    }, []);

    return (
        <div className='bg-white min-h-screen'>
            <div className='bg-[#fcf9f8] py-16 mb-12 border-b border-gray-100'>
                <div className='max-w-7xl mx-auto px-4 text-center'>
                    <h1 className='text-5xl font-serif italic text-gray-800 mb-4'>Women's Edit</h1>
                    <p className='text-gray-500 max-w-lg mx-auto uppercase tracking-[0.2em] text-sm'>
                        Timeless silhouettes for the modern woman
                    </p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 pb-20'>
        
                <div className='flex justify-between items-center mb-10 text-sm text-gray-600'>
                    <p>{womenProducts.length} curated pieces</p>
                    <div className='flex gap-4'>
                        <button className='hover:text-black transition-colors'>Filters</button>
                        <button className='hover:text-black transition-colors'>Sort By</button>
                    </div>
                </div>

                {loading ? (
                
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-100 aspect-[3/4] mb-4"></div>
                                <div className="h-4 bg-gray-100 w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-100 w-1/4"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                  
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12'>
                        {womenProducts.length > 0 ? (
                            womenProducts.map((item) => (
                                <Item 
                                    key={item._id} 
                                    itemId={item._id} 
                                    image={item.image} 
                                    title={item.name} 
                                    price={item.price}
                                />
                            ))
                        ) : (
                            <div className='col-span-full text-center py-20'>
                                <p className='text-gray-400'>New collection arriving soon.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Women;