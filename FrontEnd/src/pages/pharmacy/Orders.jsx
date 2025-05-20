import { useState } from 'react';
import { FiCheck, FiX, FiTruck, FiClock } from 'react-icons/fi';

const PharmacyOrders = ({ pharmacyId }) => {
  // Mock orders filtered by pharmacyId
  const [orders, setOrders] = useState([
    { id: '#ORD-1001', customer: 'John Doe', date: '2023-06-15', status: 'Pending', items: ['Paracetamol x2', 'Vitamin C x1'], total: 15.98 },
    { id: '#ORD-1002', customer: 'Jane Smith', date: '2023-06-14', status: 'Completed', items: ['Amoxicillin x1'], total: 12.50 }
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? {...order, status: newStatus} : order
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pharmacy Orders</h1>
      
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <select className="p-2 border rounded-lg dark:bg-gray-800">
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
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <ul className="list-disc list-inside">
                      {order.items.map((item, i) => (
                        <li key={i} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">${order.total.toFixed(2)}</td>
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
                          onClick={() => updateStatus(order.id, 'Completed')}
                          className="p-1 text-green-600 hover:text-green-800 dark:hover:text-green-400"
                          title="Mark as completed"
                        >
                          <FiCheck />
                        </button>
                        <button 
                          onClick={() => updateStatus(order.id, 'Cancelled')}
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PharmacyOrders;