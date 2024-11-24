import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/assets/Components/Login';
import Dashboard from '../src/assets/Components/Dashboard';
import Tracking from '../src/assets/Components/TrackingSystem';;
import Checkout from '../src/assets/Components/checkout';
import Header from '../src/assets/Components/Header';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking/:orderId" element={<Tracking />} />
        </Routes>
      </div>
    </Router>
  );
}

