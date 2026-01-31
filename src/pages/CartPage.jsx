import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../store/CartContextProvider';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';

const CartPage = () => {
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const { items, getTotalAmount } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const amount = getTotalAmount();
    const tax = amount * 0.18;
    setTotal(amount);
    setGrandTotal(amount > 0 ? amount + tax : 0);
  }, [getTotalAmount, items]);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <ShoppingBag size={64} className="text-gray-300" />
        <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
        <p className="text-gray-500 text-center">Looks like you haven't added anything to your cart yet.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-all"
        >
          <ArrowLeft size={18} /> Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
        Shopping Cart <span className="text-lg font-normal text-gray-500">({items.length} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
   
        <div className="lg:col-span-2 space-y-4">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 pb-4 border-b text-sm font-semibold text-gray-500 uppercase tracking-wider">
            <span className="pl-4">Product</span>
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-right pr-4">Total</span>
          </div>

          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                image={item.product.image}
                name={item.product.name}
                price={item.product.price}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping & Tax</span>
                <span className="font-medium text-gray-900">₹{total*0.18}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Promo: <code className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded">FCHGH89</code></span>
                <span className="text-green-600 font-medium">Applied</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-lg font-bold text-gray-900">Grand Total</span>
                <span className="text-lg font-bold text-amber-600">₹{grandTotal}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate("/checkout")}
              className="w-full mt-8 bg-amber-600 text-white flex items-center justify-center gap-2 py-4 rounded-xl font-bold shadow-lg shadow-amber-200 hover:bg-amber-700 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <CreditCard size={20} /> Checkout Now
            </button>
            
            <p className="text-center text-xs text-gray-400 mt-4">
              Secure Checkout • Fast Delivery • Easy Returns
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CartPage;