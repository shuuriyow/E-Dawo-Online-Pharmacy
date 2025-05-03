// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
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
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected Routes with Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
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
    </Routes>
  );
}


export default App;
