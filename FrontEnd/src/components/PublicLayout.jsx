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
      <div className="bg-gray-50 dark:bg-gray-100 text-gray-800 dark:text-white min-h-screen flex flex-col">
        <TopHeaderBar />
        <MiddleHeader />
        <BottomNav />
        <main className="flex-1">
          <Outlet />
        </main>
        <PublicFooter className="mt-12" />  
      </div>
    </PharmacyProvider>
  );
};

export default PublicLayout;
