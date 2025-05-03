import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />; // Redirect to AuthPage if not authenticated
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;