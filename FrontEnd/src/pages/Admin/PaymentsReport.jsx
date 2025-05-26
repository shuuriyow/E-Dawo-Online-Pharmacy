import React, { useEffect, useState } from 'react';
import { FiDollarSign, FiCalendar, FiTrendingUp, FiSearch, FiDownload, FiX } from 'react-icons/fi';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/admin/payments';

const PaymentsReport = () => {
  const [payments, setPayments] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPayments(res.data);
      } catch (err) {
        setError('Failed to fetch payments');
      }
      setLoading(false);
    };
    fetchPayments();
  }, []);

  // Filter payments by date and search
  const filteredPayments = payments.filter(payment => {
    const paymentDate = payment.order?.date ? new Date(payment.order.date).toISOString().slice(0, 10) : '';
    const inDateRange =
      (!dateRange.start || paymentDate >= dateRange.start) &&
      (!dateRange.end || paymentDate <= dateRange.end);
    const matchesSearch =
      !search ||
      (payment.order?.pharmacy?.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (payment.order?.user?.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (payment.method || '').toLowerCase().includes(search.toLowerCase());
    return inDateRange && matchesSearch;
  });

  const totalRevenue = filteredPayments
    .filter(p => p.status === 'Paid')
    .reduce((sum, payment) => sum + (payment.amount || 0), 0);

  // Export to CSV
  const exportCSV = () => {
    const header = [
      'Payment ID',
      'Order ID',
      'Pharmacy',
      'Patient',
      'Date',
      'Amount',
      'Method',
      'Status'
    ];
    const rows = filteredPayments.map(payment => [
      payment._id,
      payment.order?._id || '',
      payment.order?.pharmacy?.name || '',
      payment.order?.user?.name || '',
      payment.order?.date ? new Date(payment.order.date).toLocaleDateString() : '',
      payment.amount?.toFixed(2) ?? '0.00',
      payment.method || '',
      payment.status
    ]);
    const csvContent = [header, ...rows].map(e => e.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Payments Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <FiDollarSign className="text-green-600 dark:text-green-300" />
            <h3 className="font-medium">Total Revenue</h3>
          </div>
          <p className="text-2xl">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <FiTrendingUp className="text-blue-600 dark:text-blue-300" />
            <h3 className="font-medium">Paid Payments</h3>
          </div>
          <p className="text-2xl">
            {filteredPayments.filter(p => p.status === 'Paid').length}
          </p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <FiCalendar className="text-yellow-600 dark:text-yellow-300" />
            <h3 className="font-medium">Pending Payments</h3>
          </div>
          <p className="text-2xl">
            {filteredPayments.filter(p => p.status === 'Pending').length}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <span>From:</span>
          <input
            type="date"
            value={dateRange.start}
            onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
            className="p-2 border rounded-lg dark:bg-gray-700"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span>To:</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
            className="p-2 border rounded-lg dark:bg-gray-700"
          />
        </div>
        <div className="relative flex-1 max-w-xs">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search pharmacy, patient, or method..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700"
          />
        </div>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
          onClick={exportCSV}
        >
          <FiDownload /> <span>Export</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">Payment ID</th>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Pharmacy</th>
                <th className="px-6 py-3 text-left">Patient</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Method</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPayments.map(payment => (
                <tr key={payment._id}>
                  <td className="px-6 py-4">{payment._id}</td>
                  <td className="px-6 py-4">{payment.order?._id || ''}</td>
                  <td className="px-6 py-4">{payment.order?.pharmacy?.name || ''}</td>
                  <td className="px-6 py-4">{payment.order?.user?.name || ''}</td>
                  <td className="px-6 py-4">{payment.order?.date ? new Date(payment.order.date).toLocaleDateString() : ''}</td>
                  <td className="px-6 py-4">${payment.amount?.toFixed(2) ?? '0.00'}</td>
                  <td className="px-6 py-4">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${payment.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                      onClick={() => setSelectedPayment(payment)}
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

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              onClick={() => setSelectedPayment(null)}
            >
              <FiX size={22} />
            </button>
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <div className="space-y-2">
              <div><b>Payment ID:</b> {selectedPayment._id}</div>
              <div><b>Order ID:</b> {selectedPayment.order?._id || 'N/A'}</div>
              <div><b>Pharmacy:</b> {selectedPayment.order?.pharmacy?.name || 'N/A'}</div>
              <div><b>Patient:</b> {selectedPayment.order?.user?.name || 'N/A'}</div>
              <div><b>Order Date:</b> {selectedPayment.order?.date ? new Date(selectedPayment.order.date).toLocaleString() : 'N/A'}</div>
              <div><b>Payment Amount:</b> ${selectedPayment.amount?.toFixed(2) ?? '0.00'}</div>
              <div><b>Payment Method:</b> {selectedPayment.method || 'N/A'}</div>
              <div><b>Status:</b> {selectedPayment.status}</div>
              <div><b>Payment Date:</b> {selectedPayment.paidAt ? new Date(selectedPayment.paidAt).toLocaleString() : 'N/A'}</div>              {selectedPayment.transactionId && (
                <div><b>Transaction ID:</b> {selectedPayment.transactionId}</div>
              )}
              {selectedPayment.notes && (
                <div><b>Notes:</b> {selectedPayment.notes}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsReport;