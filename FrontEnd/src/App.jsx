import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/Admin/AuthPage';
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
import PharmacyLayout from './components/PharmacyLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pharmacy imports
import PharmacyDashboard from './pages/pharmacy/Dashboard';
import PharmacyMedicineManagement from './pages/pharmacy/MedicineManagement';
import PharmacyOrders from './pages/pharmacy/Orders';
import PharmacyPayments from './pages/pharmacy/Payments';
import PharmacyPrescriptions from './pages/pharmacy/Prescriptions';
import PharmacyProfile from './pages/pharmacy/Profile';

function App() {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* Public Route */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Admin Protected Routes */}
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

      {/* Pharmacy Manager Protected Routes */}
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
    </Routes>
  );
}

export default App;