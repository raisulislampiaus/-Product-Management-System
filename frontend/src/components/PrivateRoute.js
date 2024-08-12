import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import Sidebar from './Sidebar'; // Adjust the import path as necessary
import Header from './Header'; // Adjust the import path as necessary

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
