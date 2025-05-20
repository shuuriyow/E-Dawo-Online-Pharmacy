import { FiPackage, FiShoppingBag, FiDollarSign, FiTag, FiFileText } from 'react-icons/fi';
import { useEffect } from 'react';
import axios from 'axios';
const PharmacyDashboard = ({ pharmacyId }) => {
  // Mock data - in real app, fetch based on pharmacyId
  const stats = [
    { title: 'Medicines', value: 142, icon: FiPackage, change: '+5%' },
    { title: 'Pending Orders', value: 8, icon: FiShoppingBag, change: '+2' },
    { title: 'Today\'s Revenue', value: '$1,245', icon: FiDollarSign, change: '+12%' },
    { title: 'Active Discounts', value: 3, icon: FiTag, change: '-1' },
    { title: 'New Prescriptions', value: 5, icon: FiFileText, change: '+3' }
  ];
  


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pharmacy Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-800 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${index % 2 === 0 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'}`}>
                <stat.icon className={`w-6 h-6 ${index % 2 === 0 ? 'text-blue-600 dark:text-blue-300' : 'text-green-600 dark:text-green-300'}`} />
              </div>
            </div>
            <div className="mt-2">
              <span className={`text-xs ${index % 2 === 0 ? 'text-blue-600 dark:text-blue-300' : 'text-green-600 dark:text-green-300'}`}>
                {stat.change} from yesterday
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          {/* Orders list would go here */}
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">New Prescriptions</h2>
          {/* Prescriptions list would go here */}
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;