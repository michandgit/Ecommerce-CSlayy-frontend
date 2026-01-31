import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
    const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/orders/${orderId}`);
        setOrder(res.data.order);
      } catch (err) {
        setError('Unable to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-orange-400 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-orange-400 text-white rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-md p-8 text-center">

        <CheckCircle size={72} className="mx-auto text-green-500 mb-4" />

        <h1 className="text-3xl font-bold mb-2">Order Placed Successfully 🎉</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been confirmed.
        </p>

        <div className="bg-gray-100 rounded p-4 text-left mb-6">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Amount:</strong> ₹{order.total}</p>
        </div>

        <div className="mb-6 text-left">
          <h2 className="font-semibold mb-2">Items</h2>
          {order.items.map(item => (
            <div key={item._id} className="flex justify-between border-b py-2 text-sm">
              <span>{item.quantity} × {item.product?.name || 'Product'}</span>
              <span>₹{item.subtotal}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate('/orders')}
            className="px-6 py-2 border border-orange-400 text-orange-400 rounded hover:bg-orange-50"
          >
            View Orders
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
