import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/authContexts';

export default function PrivateRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Outlet />;
  }

  return (
    <Navigate
      to="/login"
      state={{ message: 'Faça login para continuar', state: location.pathname }}
    />
  );
}
