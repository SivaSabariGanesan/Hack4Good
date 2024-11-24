import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || { order: [] };

  const handleCheckout = () => {
    if (!order.length) return;

    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const deliveryAddress = '123, Sample Street, City'; 
    navigate(`/tracking/${orderId}`, {
      state: {
        order,
        address: deliveryAddress,
        orderId,
      },
    });
  };

  if (!order.length) {
    return (
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold text-red-600 mb-6">No Items in Order</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Checkout</h1>
      <ul className="mb-4">
        {order.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-2 pb-2 border-b">
            <span>{item.name} x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center font-bold text-lg mb-4">
        <span>Total:</span>
        <span>${order.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors text-lg font-bold"
      >
        Place Order and Track
      </button>
    </div>
  );
}
