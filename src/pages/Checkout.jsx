import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import { CartContext } from '../store/CartContextProvider';

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({});
  const { items, setCartItems } = useContext(CartContext);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [cartData, setCartData] = React.useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    initializeCheckout();
  }, []);

  const initializeCheckout = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/orders/initialize');
      setCartData(response.data);
      setCartItems(response.data.cartItems);
      setLoading(false);
    } catch (error) {
      setError('Failed to load checkout');
      setLoading(false);
    }
  }

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter your full name');
      return false;
    }
    if (!formData.email) {
      setError('Please enter your email');
      return false;
    }
    if (!formData.phone || formData.phone.length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }
    if (!formData.address) {
      setError('Please enter your address');
      return false;
    }
    if (!formData.paymentMethod) {
      setError('Please select a payment method');
      return false;
    }
    return true;
  }

  async function handlePayment() {
    setError(null);

    if (!validateForm()) {
      return;
    }

    if (formData.paymentMethod === 'cod') {
      createOrderAfterPayment(null, null);
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post('/payments/create-intent', {
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          street: formData.address,
          city: formData.city || 'N/A',
          state: formData.state || 'N/A',
          zipCode: formData.zipCode || 'N/A',
          country: 'India'
        },
        paymentMethod: formData.paymentMethod
      });

      const { orderId, amount, currency, key } = response.data;

      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: 'Cslayy',
        description: 'Order Payment',
        order_id: orderId,
        handler: async function (response) {
          await verifyAndCreateOrder(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#FB923C'
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setError('Payment cancelled by user');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);

    } catch (error) {
      console.error('Payment initialization error:', error);
      setError(error.response?.data?.message || 'Payment initialization failed');
      setLoading(false);
    }
  }

  const verifyAndCreateOrder = async (orderId, paymentId, signature) => {
    try {
      setLoading(true);

      const verifyResponse = await axiosInstance.post('/payments/verify', {
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature
      });

      if (verifyResponse.data.success) {
        await createOrderAfterPayment(paymentId, orderId);
      } else {
        setError('Payment verification failed');
        setLoading(false);
      }

    } catch (err) {
      console.error('Payment verification error:', err);
      setError(err.response?.data?.message || 'Payment verification failed');
      setLoading(false);
    }
  };

  const createOrderAfterPayment = async (paymentId, razorpayOrderId) => {
    try {
      setLoading(true);

      const response = await axiosInstance.post('/orders/create', {
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          addressLine: formData.address,
          email: formData.email,
        },
        paymentMethod: formData.paymentMethod,
        razorpayPaymentId: paymentId,
        razorpayOrderId: razorpayOrderId
      });
      setCartItems([]);
      navigate(`/order-success/${response.data.orderId}`);

    } catch (err) {
      console.error('Order creation error:', err);
      setError(err.response?.data?.message || 'Order creation failed');
      setLoading(false);
    }
  };

  if (loading && !cartData) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
        <p className="mt-4 text-gray-600">Loading checkout...</p>
      </div>
    );
  }

 
  if (!cartData || !items || items.length === 0) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-gray-600">Your cart is empty</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-orange-400 text-white px-6 py-2 rounded hover:bg-orange-500"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formDataObj = new FormData(event.target);
    const data = Object.fromEntries(formDataObj.entries());
    setFormData(data);

    setTimeout(() => {
      handlePayment();
    }, 100);
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white shadow-md rounded-lg p-8"
        >

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                name="firstName"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                type="text"
                placeholder="First Name *"
                required
              />

              <input
                name="lastName"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                type="text"
                placeholder="Last Name *"
                required
              />
            </div>

            <input
              name="email"
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
              type="email"
              placeholder="Email *"
              required
            />

            <input
              name="phone"
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
              type="tel"
              placeholder="Phone Number (10 digits) *"
              pattern="[0-9]{10}"
              required
            />

            <textarea
              name="address"
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              rows="3"
              placeholder="Street Address *"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="city"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                type="text"
                placeholder="City"
              />

              <input
                name="state"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                type="text"
                placeholder="State"
              />

              <input
                name="zipCode"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                type="text"
                placeholder="ZIP Code"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>

            <select
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              name="paymentMethod"
              required
            >
              <option value="">Select Payment Method</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
              <option value="netbanking">Net Banking</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-400 text-white py-3 rounded font-semibold hover:bg-orange-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>

        {/* Right side - Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-6 h-fit sticky top-4">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>


          <div className="mb-4 max-h-64 overflow-y-auto">
            {items && items.length > 0 ? (
              items.map((item) => (
                <div key={item._id} className="flex gap-3 mb-4 pb-4 border-b">
                  <img
                    src={item.product?.images?.[0] || '/placeholder.png'}
                    alt={item.product?.name || 'Product'}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {

                      if (e.target.src !== 'https://via.placeholder.com/64') {
                        e.target.src = 'https://via.placeholder.com/64';
                      }
                    }}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.product?.name || 'Unknown Product'}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity || 0}</p>
                  </div>
                  <p className="font-semibold">₹{item.subtotal || 0}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No items in cart</p>
            )}
          </div>

          {/* Pricing */}
          {cartData && cartData.pricing && (
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span>₹{cartData.pricing.subtotal?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax (18%):</span>
                <span>₹{cartData.pricing.tax?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping:</span>
                <span>
                  {cartData.pricing.shippingFee === 0
                    ? 'FREE'
                    : `₹${cartData.pricing.shippingFee?.toFixed(2) || '0.00'}`
                  }
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-4">
                <span>Total:</span>
                <span className="text-orange-400">₹{cartData.pricing.total?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Checkout