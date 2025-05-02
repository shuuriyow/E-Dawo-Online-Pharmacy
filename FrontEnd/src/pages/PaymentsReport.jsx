import { useState } from 'react';
import { FiDollarSign, FiCalendar, FiTrendingUp } from 'react-icons/fi';

const PaymentsReport = () => {
  const [payments, setPayments] = useState([
    { id: '#PAY-2001', orderId: '#ORD-1001', date: '2023-05-15', amount: 45.99, method: 'Credit Card', status: 'Paid' },
    { id: '#PAY-2002', orderId: '#ORD-1002', date: '2023-05-16', amount: 32.50, method: 'Bank Transfer', status: 'Pending' }
  ]);
  const [dateRange, setDateRange] = useState({
    start: '2023-05-01',
    end: '2023-05-31'
  });

  const filteredPayments = payments.filter(payment => {
    return payment.date >= dateRange.start && payment.date <= dateRange.end;
  });

  const totalRevenue = filteredPayments
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
            <FiTrendingUp className="text-blue-600 dark:text-blue-300" />
            <h3 className="font-medium">Paid Orders</h3>
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

      <div className="flex space-x-4 items-center">
        <div className="flex items-center space-x-2">
          <span>From:</span>
          <input 
            type="date" 
            value={dateRange.start}
            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            className="p-2 border rounded-lg dark:bg-gray-700"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span>To:</span>
          <input 
            type="date" 
            value={dateRange.end}
            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            className="p-2 border rounded-lg dark:bg-gray-700"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Payment ID</th>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Method</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPayments.map(payment => (
              <tr key={payment.id}>
                <td className="px-6 py-4">{payment.id}</td>
                <td className="px-6 py-4">{payment.orderId}</td>
                <td className="px-6 py-4">{payment.date}</td>
                <td className="px-6 py-4">${payment.amount.toFixed(2)}</td>
                <td className="px-6 py-4">{payment.method}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    payment.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsReport;