// components/Sidebar.js
import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiShoppingBag, FiLayers, FiPieChart, 
  FiDollarSign, FiTag, FiFileText, FiSettings, FiUser 
} from 'react-icons/fi';

const Sidebar = ({ sidebarOpen }) => {
  const navItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/users', icon: FiUsers, label: 'User Management' },
    { path: '/pharmacies', icon: FiShoppingBag, label: 'Pharmacy Management' },
    { path: '/categories', icon: FiLayers, label: 'Category Management' },
    { path: '/medicines', icon: FiPieChart, label: 'Medicine Overview' },
    { path: '/orders', icon: FiShoppingBag, label: 'Orders Report' },
    { path: '/payments', icon: FiDollarSign, label: 'Payments Report' },
    { path: '/discounts', icon: FiTag, label: 'Discounts Management' },
    { path: '/prescriptions', icon: FiFileText, label: 'Prescriptions' },
    { path: '/settings', icon: FiSettings, label: 'System Settings' },
    { path: '/profile', icon: FiUser, label: 'Profile Settings' },
  ];

  return (
    <div className={`bg-white dark:bg-gray-900 shadow-lg ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        {sidebarOpen ? (
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">PharmaAdmin</h1>
        ) : (
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">PA</h1>
        )}
      </div>
      
      <nav className="mt-6">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 
              ${isActive ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : ''} 
              ${sidebarOpen ? 'justify-start' : 'justify-center'}`
            }
          >
            <item.icon className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;