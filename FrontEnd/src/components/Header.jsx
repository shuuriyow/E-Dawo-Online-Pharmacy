// components/Header.jsx
import { useState, useEffect } from 'react';
import { FiMenu, FiSearch, FiSun, FiMoon, FiBell, FiUser } from 'react-icons/fi';

const Header = ({ sidebarOpen, toggleSidebar, darkMode, toggleDarkMode }) => {
  const [profileDropdown, setProfileDropdown] = useState(false);

  // Apply dark mode class to HTML element whenever darkMode changes
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  const handleThemeToggle = () => {
    toggleDarkMode(!darkMode);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm z-10 transition-colors duration-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          <div className="relative mx-4 lg:mx-6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="w-5 h-5 text-gray-400" />
            </span>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 border rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 transition-colors duration-200"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleThemeToggle}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full focus:outline-none transition-colors duration-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <FiSun className="w-5 h-5 text-yellow-400" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          <button
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full focus:outline-none relative transition-colors duration-200"
            aria-label="Notifications"
          >
            <FiBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center space-x-2 focus:outline-none"
              aria-label="User profile menu"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <FiUser className="w-4 h-4" />
              </div>
              <span className="hidden md:inline-block text-gray-700 dark:text-gray-300 transition-colors duration-200">Admin</span>
            </button>

            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 transition-colors duration-200">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setProfileDropdown(false)}
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

export default Header;