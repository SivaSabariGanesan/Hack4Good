import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const trackingStages = [
  { id: 1, name: 'Item bought', icon: '📋', location: 'Lake' },
  { id: 2, name: 'RFID Tagged', icon: '🏷️', location: 'Restaurant' },
  { id: 3, name: 'Items Packed', icon: '📦', location: 'Restaurant' },
  { id: 4, name: 'Container Sealed', icon: '🔒', location: 'Restaurant' },
  { id: 5, name: 'In Transit', icon: '🚚', location: 'En Route' },
  { id: 6, name: 'Truck Stopped', icon: '🛑', location: 'Rest Area' },
  { id: 7, name: 'Container Opened', icon: '📭', location: 'Distribution Center' },
  { id: 8, name: 'Delivered', icon: '✅', location: 'Delivery Address' },
];

export default function Tracking() {
  const { orderId } = useParams();
  const location = useLocation();
  const { order, address } = location.state || { order: [], address: '' };
  const [currentStage, setCurrentStage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prevStage) => {
        if (prevStage < trackingStages.length) {
          return prevStage + 1;
        }
        clearInterval(interval);
        return prevStage;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Order Tracking</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-2">Order #{orderId}</h2>
        <p className="text-gray-600 mb-4">Delivery Address: {address}</p>
        <ul className="list-disc pl-5">
          {order.map((item) => (
            <li key={item.id}>{item.name} x{item.quantity}</li>
          ))}
        </ul>
      </div>
      <div className="relative">
        {trackingStages.map((stage, index) => (
          <div key={stage.id} className="flex items-center mb-8">
            <div
              className={`rounded-full h-12 w-12 flex items-center justify-center text-2xl ${
                stage.id <= currentStage ? 'bg-green-500 text-white' : 'bg-gray-300'
              }`}
            >
              {stage.icon}
            </div>
            <div className="ml-4">
              <h3 className="font-bold">{stage.name}</h3>
              <p className="text-sm text-gray-600">Location: {stage.location}</p>
              {stage.id === currentStage && (
                <p className="text-sm text-blue-600">In progress...</p>
              )}
            </div>
            {index < trackingStages.length - 1 && (
              <div
                className={`absolute left-6 ml-[1px] w-0.5 h-16 ${
                  stage.id < currentStage ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
