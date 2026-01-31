import React, { useEffect, useState } from 'react';
import { getAllOrdersForUser } from "../apis/apiCall";
import { Package, Calendar, DollarSign, ChevronRight } from 'lucide-react';
import Order from '../components/Order';

const Orders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await getAllOrdersForUser();
                console.log("Fetched Orders: ", orders);
                setAllOrders(orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Order History</h1>
                    <p className="mt-2 text-lg text-gray-600">Check the status of recent orders and manage returns.</p>
                </header>

                {allOrders.length === 0 ? (
                    <div className="text-center bg-white rounded-xl shadow-sm p-12 border border-gray-100">
                        <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                        <h2 className="text-xl font-medium text-gray-900">No orders yet</h2>
                        <p className="mt-1 text-gray-500">When you buy something, it will appear here.</p>
                        <button className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {allOrders.map((order) => (
                           <Order key={order._id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;