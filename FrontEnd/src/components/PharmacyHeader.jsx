import { useState } from 'react';
import { FiMenu, FiSun, FiMoon, FiBell } from 'react-icons/fi';

const PharmacyHeader = ({ sidebarOpen, toggleSidebar, darkMode, toggleDarkMode }) => {
  const [profileDropdown, setProfileDropdown] = useState(false);

  // Get manager name from localStorage user object
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const managerName = user.name || 'Manager';

  // Get pharmacy name from localStorage pharmacy object
  const pharmacy = JSON.parse(localStorage.getItem('pharmacy') || '{}');
  const pharmacyName = pharmacy.name || 'My Pharmacy';

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <div className="ml-4 font-medium text-gray-700 dark:text-gray-300">
            {sidebarOpen && pharmacyName}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full focus:outline-none"
          >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full focus:outline-none relative">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {managerName.charAt(0)}
              </div>
              {sidebarOpen && (
                <span className="hidden md:inline-block text-gray-700 dark:text-gray-300">
                  {managerName}
                </span>
              )}
            </button>
            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  My Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => {
                    // Clear authentication data
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('pharmacy');
                    // Redirect to the login page
                    window.location.href = '/auth';
                  }}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PharmacyHeader;