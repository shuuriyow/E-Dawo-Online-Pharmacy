// App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import PharmacyManagement from './pages/PharmacyManagement';
import CategoryManagement from './pages/CategoryManagement';
import MedicineOverview from './pages/MedicineOverview';
import OrdersReport from './pages/OrdersReport';
import PaymentsReport from './pages/PaymentsReport';
import DiscountsManagement from './pages/DiscountsManagement';
import Prescriptions from './pages/Prescriptions';
import SystemSettings from './pages/SystemSettings';
import ProfileSettings from './pages/ProfileSettings';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) return JSON.parse(savedMode);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('darkMode')) {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
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
            
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4 transition-colors duration-200">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/pharmacies" element={<PharmacyManagement />} />
                <Route path="/categories" element={<CategoryManagement />} />
                <Route path="/medicines" element={<MedicineOverview />} />
                <Route path="/orders" element={<OrdersReport />} />
                <Route path="/payments" element={<PaymentsReport />} />
                <Route path="/discounts" element={<DiscountsManagement />} />
                <Route path="/prescriptions" element={<Prescriptions />} />
                <Route path="/settings" element={<SystemSettings />} />
                <Route path="/profile" element={<ProfileSettings />} />
              </Routes>
            </main>
          </div>
        </div>

        <Footer darkMode={darkMode} />
      </div>
    </Router >
  );
}

export default App;