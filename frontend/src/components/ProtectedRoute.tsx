import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo = "/login" }) => {
  const auth = useAuth();

  return auth.token ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
