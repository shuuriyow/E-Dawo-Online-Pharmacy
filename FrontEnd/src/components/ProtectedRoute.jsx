import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const userRole = localStorage.getItem('role'); // Example: Get role from localStorage

  // Debugging logs
  console.log('User Role:', userRole);
  console.log('Allowed Roles:', allowedRoles);

  if (!allowedRoles.includes(userRole)) {
    console.log('Access Denied: Redirecting to /auth');
    return <Navigate to="/auth" replace />;
  }

  console.log('Access Granted: Rendering children');
  return children;
};

export default ProtectedRoute;