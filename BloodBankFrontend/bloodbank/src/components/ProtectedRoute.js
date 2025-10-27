import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import your auth context

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // User is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  return children; // User is authenticated, render the children (the protected component)
};

export default ProtectedRoute;