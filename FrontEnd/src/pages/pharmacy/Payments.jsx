import { useState } from 'react';
import { FiDollarSign, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

const PharmacyPayments = ({ pharmacyId }) => {
  // Mock payments filtered by pharmacyId
  const [payments, setPayments] = useState([
    { id: '#PAY-2001', orderId: '#ORD-1001', date: '2023-06-15', amount: 15.98, method: 'Credit Card', status: 'Paid' },
    { id: '#PAY-2002', orderId: '#ORD-1002', date: '2023-06-14', amount: 12.50, method: 'Cash', status: 'Pending' }
  ]);

  const [dateRange, setDateRange] = useState({
    start: '2023-06-01',
    end: '2023-06-30'
  });

  const totalRevenue = payments
    .filter(p => p.status === 'Paid')
    .reduce((sum, payment) => sum + payment.amount, 0);

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
            <FiCheckCircle className="text-blue-600 dark:text-blue-300" />
            <h3 className="font-medium">Paid Payments</h3>
          </div>
          <p className="text-2xl">
            {payments.filter(p => p.status === 'Paid').length}
          </p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <FiClock className="text-yellow-600 dark:text-yellow-300" />
            <h3 className="font-medium">Pending Payments</h3>
          </div>
          <p className="text-2xl">
            {payments.filter(p => p.status === 'Pending').length}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div className="flex items-center space-x-2">
          <span>From:</span>
          <input 
            type="date" 
            value={dateRange.start}
            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            className="p-2 border rounded-lg dark:bg-gray-700"
          />
          <span>To:</span>
          <input 
            type="date" 
            value={dateRange.end}
            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            className="p-2 border rounded-lg dark:bg-gray-700"
          />
        </div>
        <input
          type="text"
          placeholder="Search payments..."
          className="p-2 border rounded-lg dark:bg-gray-700"
        />
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-50 dark:bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Payment ID</th>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Method</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
            {payments.map(payment => (
              <tr key={payment.id}>
                <td className="px-6 py-4">{payment.id}</td>
                <td className="px-6 py-4">{payment.orderId}</td>
                <td className="px-6 py-4">{payment.date}</td>
                <td className="px-6 py-4">${payment.amount.toFixed(2)}</td>
                <td className="px-6 py-4">{payment.method}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {payment.status === 'Paid' ? (
                      <FiCheckCircle className="text-green-500 mr-1" />
                    ) : payment.status === 'Pending' ? (
                      <FiClock className="text-yellow-500 mr-1" />
                    ) : (
                      <FiXCircle className="text-red-500 mr-1" />
                    )}
                    {payment.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacyPayments;