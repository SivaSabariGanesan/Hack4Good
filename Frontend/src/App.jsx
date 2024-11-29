import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './assets/Components/Login';
import Dashboard from './assets/Components/Dashboard';
import Tracking from './assets/Components/TrackingSystem';
import Checkout from './assets/Components/Checkout';
import Header from './assets/Components/Header';
import Profile from './assets/Components/profile';

export default function App() {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState([]);

  const handleCheckout = (navigate) => {
    console.log('Proceeding to checkout');
    navigate('/checkout'); // Navigate to the Checkout page
  };
  
  const handleViewHistory = () => {
    console.log('Viewing order history');
  };

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/" />;
  };

  return (
    <GoogleOAuthProvider clientId="179047694565-gjv2b779lt37ofj82ntni43dco5ppgb8.apps.googleusercontent.com">
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header
            order={order}
            onCheckout={handleCheckout}
            onViewHistory={handleViewHistory}
            user={user}
            setUser={setUser}
          />
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard user={user} setOrder={setOrder} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout order={order} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tracking/:orderId"
              element={
                <ProtectedRoute>
                  <Tracking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}
