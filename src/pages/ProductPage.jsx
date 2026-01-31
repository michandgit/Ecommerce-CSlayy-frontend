import { useParams, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { getProductById } from '../apis/apiCall.jsx';
import { CartContext } from '../store/CartContextProvider';

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('M'); // Default size
    const { addItem } = useContext(CartContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                const parsedProduct = {
                    ...data,
                    instructions: normalizeInstructions(data.instructions),
                };
                setProduct(parsedProduct);
            } catch (err) {
                console.error("Failed to fetch product", err);
            }
        }
        fetchProduct();
    }, [id]);

    const normalizeInstructions = (instructions) => {
        if (!instructions) return [];
        if (Array.isArray(instructions) && typeof instructions[0] === "string") {
            try {
                const parsed = JSON.parse(instructions[0]);
                return Array.isArray(parsed) ? parsed : [];
            } catch { return []; }
        }
        return instructions;
    };

    if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <nav className="text-sm text-gray-500 mb-8 cursor-pointer" onClick={() => navigate(-1)}>
                &larr; Back to Collection
            </nav>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
                
        
                <div className='relative group'>
                    <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
                        <img 
                            className='w-full h-[500px] md:h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-500' 
                            src={product.image || 'https://via.placeholder.com/600x800'} 
                            alt={product.name} 
                        />
                    </div>
                
                    <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        New Arrival
                    </span>
                </div>

            
                <div className='flex flex-col'>
                    <h1 className='text-4xl font-extrabold text-gray-900 mb-2'>{product.name}</h1>
                    <p className='text-2xl font-medium text-orange-600 mb-6'>₹{product.price}</p>
                    
                    <div className="border-t border-b border-gray-100 py-6 mb-6">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Description</h3>
                        <p className='text-gray-600 leading-relaxed'>{product.details}</p>
                    </div>

            
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Select Size</h3>
                        <div className='flex gap-3'>
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`h-12 w-12 flex items-center justify-center rounded-md border-2 transition-all
                                        ${selectedSize === size 
                                            ? 'border-orange-500 bg-orange-50 text-orange-600 font-bold' 
                                            : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                  
                    {product.instructions?.length > 0 && (
                        <div className="mb-8 bg-gray-50 p-4 rounded-xl">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-3">Care Instructions</h3>
                            <ul className='space-y-2'>
                                {product.instructions.map((inst, index) => (
                                    <li key={index} className='text-sm text-gray-600 flex items-start'>
                                        <span className="text-orange-400 mr-2">•</span> {inst}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <button 
                            onClick={() => addItem({...product, size: selectedSize})} 
                            className='flex-1 bg-orange-500 text-white py-4 px-8 rounded-full font-bold text-lg shadow-lg hover:bg-orange-600 hover:shadow-orange-200 transition-all active:scale-95'
                        >
                            Add to Cart
                        </button>
                        <button className="p-4 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>

                  
                    <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                            🚚 <span className="font-medium">Free Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            🛡️ <span className="font-medium">2-Year Warranty</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;