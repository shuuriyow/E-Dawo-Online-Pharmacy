import { NavLink } from 'react-router-dom';
import { FiHome, FiPackage, FiShoppingBag, FiDollarSign, FiFileText, FiUser, FiImage } from 'react-icons/fi';

const PharmacySidebar = ({ sidebarOpen }) => {
  // Get pharmacy info from localStorage (set this after login or fetch)
  const pharmacy = JSON.parse(localStorage.getItem('pharmacy') || '{}');
  const pharmacyName = pharmacy.name || 'My Pharmacy';
  const pharmacyLogo = pharmacy.logo;

  const navItems = [
    { path: '/pharmacy/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/pharmacy/MedicineManagement', icon: FiPackage, label: 'Medicine Management' },
    { path: '/pharmacy/orders', icon: FiShoppingBag, label: 'Orders' },
    { path: '/pharmacy/payments', icon: FiDollarSign, label: 'Payments' },
    { path: '/pharmacy/prescriptions', icon: FiFileText, label: 'Prescriptions' },
    { path: '/pharmacy/profile', icon: FiUser, label: 'Profile' },
  ];

  return (
    <div className={`bg-white dark:bg-gray-900 shadow-lg ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        {sidebarOpen ? (
          <>
            {pharmacyLogo ? (
              <img
                src={pharmacyLogo}
                alt={pharmacyName}
                className="h-10 w-10 rounded-full object-cover mr-3"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
                <FiImage className="w-5 h-5" />
              </div>
            )}
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white">{pharmacyName}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Manager Dashboard</p>
            </div>
          </>
        ) : (
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">PM</h1>
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

export default PharmacySidebar;