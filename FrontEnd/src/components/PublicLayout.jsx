// PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopHeaderBar from './TopHeaderBar';
import MiddleHeader from './MiddleHeader';
import BottomNav from './BottomNav';
import PublicFooter from './publicFooter';
import { PharmacyProvider } from '../context/PharmacyContext'; // Adjust the import path as necessary

const PublicLayout = () => {
  return (
    <PharmacyProvider>
      {/* Fixed headers */}
      <div className="bg-gray-50 dark:bg-gray-100 text-gray-800 dark:text-white  flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 w-full z-30">
          <TopHeaderBar />
          <MiddleHeader />
          <BottomNav />
        </div>
        {/* Main content with padding to avoid overlap with fixed headers */}
        <main
          className="flex-1 pt-[144px] overflow-auto"
        >
          <Outlet />
        </main>
        {/* Footer (not fixed) */}
        <PublicFooter />
      </div>
    </PharmacyProvider>
  );
};

export default PublicLayout;
