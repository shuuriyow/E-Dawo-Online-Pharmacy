import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheck, FiX, FiTruck } from 'react-icons/fi';

const PharmacyOrders = () => {
  const pharmacy = JSON.parse(localStorage.getItem('pharmacy') || '{}');
  const pharmacyId = pharmacy._id;
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/orders?pharmacy=${pharmacyId}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };
    if (pharmacyId) fetchOrders();
  }, [pharmacyId]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/orders/${id}`, { status: newStatus });
      setOrders(orders.map(order => order._id === id ? res.data : order));
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  // Filter orders by status
  const filteredOrders = statusFilter === 'All Statuses'
    ? orders
    : orders.filter(order => order.status === statusFilter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pharmacy Orders</h1>
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <select
              className="p-2 border rounded-lg dark:bg-gray-800"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Items</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              {filteredOrders.map(order => (
                <tr key={order._id}>
                  <td className="px-6 py-4">#{order._id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4">{order.user?.name || 'N/A'}</td>
                  <td className="px-6 py-4">{order.date ? order.date.split('T')[0] : ''}</td>
                  <td className="px-6 py-4">
                    <ul className="list-disc list-inside">
                      {order.items.map((item, i) => (
                        <li key={i} className="text-sm">{item.name} x{item.quantity}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">${order.total?.toFixed(2) || '0.00'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {order.status === 'Pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateStatus(order._id, 'Completed')}
                          className="p-1 text-green-600 hover:text-green-800 dark:hover:text-green-400"
                          title="Mark as completed"
                        >
                          <FiCheck />
                        </button>
                        <button
                          onClick={() => updateStatus(order._id, 'Cancelled')}
                          className="p-1 text-red-600 hover:text-red-800 dark:hover:text-red-400"
                          title="Cancel order"
                        >
                          <FiX />
                        </button>
                      </div>
                    )}
                    {order.status === 'Completed' && (
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <FiTruck className="mr-1" /> Shipped
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PharmacyOrders;