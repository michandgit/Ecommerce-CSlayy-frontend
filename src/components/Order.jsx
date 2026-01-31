import React, {useState} from 'react'
import { Package, Calendar, DollarSign, ChevronRight } from 'lucide-react';

const Order = ({ order }) => {
    const [showDetail, setShowDetail] = useState(false);

    const handleDetailsClick = () => {
        setShowDetail(!showDetail);
    }
    return (
        <div key={order._id} className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <Package className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Order Number</p>
                            <p className="text-md font-bold text-gray-900">#{order._id.slice(-8).toUpperCase()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:flex sm:items-center">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Date Placed</p>
                            <div className="flex items-center mt-1 text-gray-900">
                                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                <span className="text-sm font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Total Amount</p>
                            <div className="flex items-center mt-1 text-gray-900">
                                <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                                <span className="text-sm font-bold">{order.total}</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={handleDetailsClick} className="flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </button>
                  
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Confirmed
                </span>
                <span className="text-xs text-gray-500">Ships within 24 hours</span>
            </div>
            {
                showDetail && (
                    <div className="p-6 border-t border-gray-100 bg-white">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                        <div className="space-y-4">
                            <ul className="space-y-4">
                                {order.items.map((item) => (
                                    <li key={item.product._id} className="flex items-center space-x-4">
                                        <img src={item.product.image} alt={item.product.name} className="h-16 w-16 object-cover rounded-md" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Order
