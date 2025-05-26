import React, { useEffect, useState } from 'react';
import { FiFilter, FiSearch, FiDownload, FiX } from 'react-icons/fi';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/admin/orders';

const OrdersReport = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    pharmacy: '',
    dateFrom: '',
    dateTo: ''
  });
  const [pendingFilters, setPendingFilters] = useState(filters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        setError('Failed to fetch orders');
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  // Apply filters only when the Filters button is clicked
  const filteredOrders = orders.filter(order => {
    return (
      (filters.status === 'all' || order.status === filters.status) &&
      (filters.pharmacy === '' || (order.pharmacy?.name || '').toLowerCase().includes(filters.pharmacy.toLowerCase())) &&
      (filters.dateFrom === '' || new Date(order.date) >= new Date(filters.dateFrom)) &&
      (filters.dateTo === '' || new Date(order.date) <= new Date(filters.dateTo))
    );
  });

  // Export filtered orders to CSV
  const exportCSV = () => {
    const header = ['Order ID', 'Pharmacy', 'Patient', 'Items', 'Total', 'Status', 'Date'];
    const rows = filteredOrders.map(order => [
      order._id,
      order.pharmacy?.name || 'N/A',
      order.user?.name || 'N/A',
      order.items.map(item => `${item.name} x${item.quantity}`).join('; '),
      order.total?.toFixed(2) ?? '0.00',
      order.status,
      new Date(order.date).toLocaleDateString()
    ]);
    const csvContent = [header, ...rows].map(e => e.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle filter input changes
  const handlePendingFilterChange = (key, value) => {
    setPendingFilters(prev => ({ ...prev, [key]: value }));
  };

  // Apply filters when Filters button is clicked
  const applyFilters = () => {
    setFilters(pendingFilters);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Orders Report</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search pharmacy..."
              value={pendingFilters.pharmacy}
              onChange={e => handlePendingFilterChange('pharmacy', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700"
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={pendingFilters.status}
              onChange={e => handlePendingFilterChange('status', e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-700"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <input
              type="date"
              value={pendingFilters.dateFrom}
              onChange={e => handlePendingFilterChange('dateFrom', e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-700"
            />
            <input
              type="date"
              value={pendingFilters.dateTo}
              onChange={e => handlePendingFilterChange('dateTo', e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-700"
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              onClick={applyFilters}
            >
              <FiFilter /> <span>Filters</span>
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
              onClick={exportCSV}
            >
              <FiDownload /> <span>Export</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-4">Loading...</div>
          ) : error ? (
            <div className="p-4 text-red-500">{error}</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left">Order ID</th>
                  <th className="px-6 py-3 text-left">Pharmacy</th>
                  <th className="px-6 py-3 text-left">Patient</th>
                  <th className="px-6 py-3 text-left">Items</th>
                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td className="px-6 py-4">{order._id.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-4">{order.pharmacy?.name || 'N/A'}</td>
                    <td className="px-6 py-4">{order.user?.name || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {order.items.map((item, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                            {item.name} x{item.quantity}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">${order.total?.toFixed(2) ?? '0.00'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              onClick={() => setSelectedOrder(null)}
            >
              <FiX size={22} />
            </button>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="space-y-2">
              <div><b>Order ID:</b> {selectedOrder._id}</div>
              <div><b>Pharmacy:</b> {selectedOrder.pharmacy?.name || 'N/A'}</div>
              <div><b>Patient:</b> {selectedOrder.user?.name || 'N/A'}</div>
              <div><b>Status:</b> {selectedOrder.status}</div>
              <div><b>Date:</b> {new Date(selectedOrder.date).toLocaleString()}</div>
              <div><b>Total:</b> ${selectedOrder.total?.toFixed(2) ?? '0.00'}</div>
              <div>
                <b>Items:</b>
                <ul className="list-disc ml-6">
                  {selectedOrder.items.map((item, i) => (
                    <li key={i}>
                      {item.name} x{item.quantity} {item.price ? `($${item.price})` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersReport;