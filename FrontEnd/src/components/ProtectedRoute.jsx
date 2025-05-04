import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for token
  const location = useLocation(); // Keep current location to redirect back later if needed

  // If no token, redirect to login page and preserve the route they tried to access
  if (!token) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  // If authenticated, render the children (protected components)
  return children;
};

export default ProtectedRoute;
