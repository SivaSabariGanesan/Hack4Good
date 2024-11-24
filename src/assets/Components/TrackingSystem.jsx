import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const trackingStages = [
  { id: 1, name: 'Item bought', icon: '📋', location: { lat: 40.7128, lng: -74.0060 }, nameLocation: 'Lake' }, // Example coordinates for stages
  { id: 2, name: 'RFID Tagged', icon: '🏷️', location: { lat: 40.730610, lng: -73.935242 }, nameLocation: 'Restaurant' },
  { id: 3, name: 'Items Packed', icon: '📦', location: { lat: 40.7410, lng: -73.9930 }, nameLocation: 'Restaurant' },
  { id: 4, name: 'Container Sealed', icon: '🔒', location: { lat: 40.748817, lng: -73.985428 }, nameLocation: 'Restaurant' },
  { id: 5, name: 'In Transit', icon: '🚚', location: { lat: 40.6782, lng: -73.9442 }, nameLocation: 'En Route' },
  { id: 6, name: 'Truck Stopped', icon: '🛑', location: { lat: 40.6447, lng: -73.7790 }, nameLocation: 'Rest Area' },
  { id: 7, name: 'Container Opened', icon: '📭', location: { lat: 40.730610, lng: -73.935242 }, nameLocation: 'Distribution Center' },
  { id: 8, name: 'Delivered', icon: '✅', location: { lat: 40.7128, lng: -74.0060 }, nameLocation: 'Delivery Address' },
];

const containerStyle = {
  width: '100%',
  height: '400px',
};

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

      {/* Order Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-2">Order #{orderId}</h2>
        <p className="text-gray-600 mb-4">Delivery Address: {address}</p>
        <ul className="list-disc pl-5">
          {order.map((item) => (
            <li key={item.id}>{item.name} x{item.quantity}</li>
          ))}
        </ul>
      </div>

      {/* Google Map Section */}
      <div className="relative mb-8">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={trackingStages[currentStage - 1].location}
            zoom={12}
          >
            {/* Display markers for all stages */}
            {trackingStages.map((stage, index) => (
              <Marker
                key={stage.id}
                position={stage.location}
                label={stage.icon}
              />
            ))}

            {/* Draw a polyline for the journey path */}
            <Polyline
              path={trackingStages.map((stage) => stage.location)}
              options={{
                strokeColor: '#00FF00',
                strokeOpacity: 1.0,
                strokeWeight: 3,
                geodesic: true,
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Tracking Stages Section */}
      <div className="relative">
        {trackingStages.map((stage, index) => (
          <div key={stage.id} className="flex items-center mb-8">
            <div
              className={`rounded-full h-12 w-12 flex items-center justify-center text-2xl ${stage.id <= currentStage ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
            >
              {stage.icon}
            </div>
            <div className="ml-4">
              <h3 className="font-bold">{stage.name}</h3>
              <p className="text-sm text-gray-600">Location: {stage.nameLocation}</p>
              {stage.id === currentStage && (
                <p className="text-sm text-blue-600">In progress...</p>
              )}
            </div>

            {/* Line connecting stages */}
            {index < trackingStages.length - 1 && (
              <div
                className={`absolute left-6 ml-[1px] w-0.5 h-16 ${stage.id < currentStage ? 'bg-green-500' : 'bg-gray-300'}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
