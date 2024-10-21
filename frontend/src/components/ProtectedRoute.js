// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import UnauthorizedPage from './UnauthorizedPage'; // Import your Unauthorized component

const ProtectedRoute = ({ element, userType, allowedTypes, ...rest }) => {
  if (!allowedTypes.includes(userType)) {
    return <UnauthorizedPage />;
  }

  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
