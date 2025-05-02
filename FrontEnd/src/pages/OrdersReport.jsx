import { useState } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';

const OrdersReport = () => {
  const [orders, setOrders] = useState([
    { id: '#ORD-1001', pharmacy: 'City Pharmacy', date: '2023-05-15', status: 'Delivered', total: 45.99, items: ['Paracetamol', 'Vitamin C'] },
    { id: '#ORD-1002', pharmacy: 'Health Plus', date: '2023-05-16', status: 'Processing', total: 32.50, items: ['Amoxicillin'] }
  ]);
  const [filters, setFilters] = useState({
    status: 'all',
    pharmacy: '',
    dateFrom: '',
    dateTo: ''
  });

  const filteredOrders = orders.filter(order => {
    return (
      (filters.status === 'all' || order.status === filters.status) &&
      (filters.pharmacy === '' || order.pharmacy.includes(filters.pharmacy)) &&
      (filters.dateFrom === '' || order.date >= filters.dateFrom) &&
      (filters.dateTo === '' || order.date <= filters.dateTo)
    );
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Orders Report</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700"
              />
            </div>
            <div className="flex space-x-2">
              <select 
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="p-2 border rounded-lg dark:bg-gray-700"
              >
                <option value="all">All Statuses</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <FiFilter /> <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Pharmacy</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Items</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.pharmacy}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {order.items.map((item, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                      View
                    </button>
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

export default OrdersReport;