// pages/Dashboard.js
import { FiUsers, FiShoppingBag, FiPackage, FiDollarSign, FiTag, FiFileText } from 'react-icons/fi';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const Dashboard = () => {
    // Stats data
    const stats = [
        { title: 'Total Pharmacies', value: '1,254', icon: FiShoppingBag, change: '+12%', trend: 'up' },
        { title: 'Total Medicines', value: '8,542', icon: FiPackage, change: '+5%', trend: 'up' },
        { title: 'Total Orders', value: '3,215', icon: FiShoppingBag, change: '+8%', trend: 'up' },
        { title: 'Total Payments', value: '$42,850', icon: FiDollarSign, change: '+15%', trend: 'up' },
        { title: 'Active Discounts', value: '24', icon: FiTag, change: '-3%', trend: 'down' },
        { title: 'Prescriptions', value: '1,856', icon: FiFileText, change: '+20%', trend: 'up' },
    ];

    // Chart data
    const ordersData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Orders',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        ],
    };

    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Revenue',
                data: [12500, 19000, 15000, 21000, 18500, 22500, 19500],
                borderColor: 'rgba(16, 185, 129, 1)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const topMedicinesData = {
        labels: ['Paracetamol', 'Amoxicillin', 'Ibuprofen', 'Omeprazole', 'Cetirizine'],
        datasets: [
            {
                data: [300, 250, 200, 150, 100],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(239, 68, 68, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
      
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                                <p className="text-2xl font-semibold text-gray-800 dark:text-white">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${stat.trend === 'up' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-red-100 dark:bg-red-900'}`}>
                                <stat.icon className={`w-6 h-6 ${stat.trend === 'up' ? 'text-blue-600 dark:text-blue-300' : 'text-red-600 dark:text-red-300'}`} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className={`inline-flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {stat.change} from last month
                                {stat.trend === 'up' ? (
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Orders Chart */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Monthly Orders</h2>
                    <div className="h-64">
                        <Bar
                            data={ordersData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Revenue Trend</h2>
                    <div className="h-64">
                        <Line
                            data={revenueData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Medicines */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 lg:col-span-1">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Top Medicines</h2>
                    <div className="h-64">
                        <Pie
                            data={topMedicinesData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'right',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                            <thead className="bg-gray-50 dark:bg-gray-600">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pharmacy</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <tr key={item}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">#ORD-{1000 + item}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Pharmacy {item}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${(50 + item * 10).toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${item % 3 === 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                    item % 3 === 1 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                                                {item % 3 === 0 ? 'Delivered' : item % 3 === 1 ? 'Processing' : 'Cancelled'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{new Date().toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;