import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className={`flex flex-col h-screen bg-gray-50 ${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-800 pt-20 p-4">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default Layout;
