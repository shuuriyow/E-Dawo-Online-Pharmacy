import React, { useState, useEffect } from 'react';
import PharmacyHeader from './PharmacyHeader';
import PharmacySidebar from './PharmacySidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

function PharmacyLayout() {
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

useEffect(() => {
  async function fetchAndSavePharmacy() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/pharmacies/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.setItem('pharmacy', JSON.stringify(response.data));
    } catch (error) {
      console.error('Failed to fetch pharmacy:', error);
    }
  }
  fetchAndSavePharmacy();
}, []);

  return (
    <div className={`flex h-screen bg-gray-50 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <PharmacySidebar sidebarOpen={sidebarOpen} />
      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <PharmacyHeader
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PharmacyLayout;