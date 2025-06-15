// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

// cartprovder 
import { CartProvider } from './context/CartContext';


// Auth
import AuthPage from './pages/Admin/AuthPage';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import UserManagement from './pages/Admin/UserManagement';
import PharmacyManagement from './pages/Admin/PharmacyManagement';
import CategoryManagement from './pages/Admin/CategoryManagement';
import MedicineOverview from './pages/Admin/MedicineOverview';
import OrdersReport from './pages/Admin/OrdersReport';
import PaymentsReport from './pages/Admin/PaymentsReport';
import DiscountsManagement from './pages/Admin/DiscountsManagement';
import Prescriptions from './pages/Admin/Prescriptions';
import SystemSettings from './pages/Admin/SystemSettings';
import ProfileSettings from './pages/Admin/ProfileSettings';
import Layout from './components/Layout';

// Pharmacy Pages
import PharmacyLayout from './components/PharmacyLayout';
import PharmacyDashboard from './pages/pharmacy/Dashboard';
import PharmacyMedicineManagement from './pages/pharmacy/MedicineManagement';
import PharmacyOrders from './pages/pharmacy/Orders';
import PharmacyPayments from './pages/pharmacy/Payments';
import PharmacyPrescriptions from './pages/pharmacy/Prescriptions';
import PharmacyProfile from './pages/pharmacy/Profile';


// Customer (Public) Pages
import PublicLayout from './components/PublicLayout';
import Home from './pages/Public/Home';
import CartPage from './pages/Public/CartPage';
import CheckoutPage from './pages/Public/CheckoutPage';
import PharmacyPage from './pages/Public/PharmacyPage';

// Protection
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';

function App() {
  return (
    <CartProvider>
      <Routes>

        {/* ✅ Redirect root to customer home page */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
         <Route path="/pharmacies/:pharmacyId" element={<PharmacyPage />} />

          {/* In future: Add About, Categories, Contact, etc. here */}
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* ✅ Pharmacy Page */}

        {/* ✅ Public Layout for all customer routes */}
        {/* ✅ Login page */}
        <Route path="/auth" element={<AuthPage />} />

        {/* ✅ Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="pharmacies" element={<PharmacyManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="medicines" element={<MedicineOverview />} />
          <Route path="orders" element={<OrdersReport />} />
          <Route path="payments" element={<PaymentsReport />} />
          <Route path="discounts" element={<DiscountsManagement />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Route>

        {/* ✅ Pharmacy Manager Routes */}
        <Route
          path="/pharmacy"
          element={
            <ProtectedRoute allowedRoles={['Pharmacy Manager']}>
              <PharmacyLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PharmacyDashboard />} />
          <Route path="dashboard" element={<PharmacyDashboard />} />
          <Route path="MedicineManagement" element={<PharmacyMedicineManagement />} />
          <Route path="orders" element={<PharmacyOrders />} />
          <Route path="payments" element={<PharmacyPayments />} />
          <Route path="prescriptions" element={<PharmacyPrescriptions />} />
          <Route path="profile" element={<PharmacyProfile />} />

        </Route>

        {/* ❌ Fallback redirect (optional) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      );
    </CartProvider>
  );

}

export default App;
