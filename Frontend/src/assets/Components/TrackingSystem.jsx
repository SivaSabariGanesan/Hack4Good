import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import { Truck, Package, CheckCircle, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';

const trackingStages = [
  { id: 1, name: 'Order Placed', icon: Package, location: { lat: 40.7128, lng: -74.0060 }, nameLocation: 'Warehouse' },
  { id: 2, name: 'Preparing', icon: Package, location: { lat: 40.730610, lng: -73.935242 }, nameLocation: 'Packaging Center' },
  { id: 3, name: 'Shipped', icon: Truck, location: { lat: 40.7410, lng: -73.9930 }, nameLocation: 'Distribution Center' },
  { id: 4, name: 'In Transit', icon: Truck, location: { lat: 40.748817, lng: -73.985428 }, nameLocation: 'En Route' },
  { id: 5, name: 'Out for Delivery', icon: Truck, location: { lat: 40.6782, lng: -73.9442 }, nameLocation: 'Local Delivery Center' },
  { id: 6, name: 'Delivered', icon: CheckCircle, location: { lat: 40.7128, lng: -74.0060 }, nameLocation: 'Delivery Address' },
];

const containerStyle = {
  width: '100%',
  height: '400px',
};

const Tracking = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Checkout
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Tracking Order #{orderId}</h2>

          {/* Order Info Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
            <p className="text-gray-600">{address}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
            <div className="space-y-4">
              {order?.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

       

          {/* Tracking Stages Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Tracking Status</h3>
            <div className="relative">
              {trackingStages.map((stage, index) => (
                <div key={stage.id} className="flex items-start mb-8 relative">
                  <div
                    className={`rounded-full h-12 w-12 flex items-center justify-center text-2xl ${
                      stage.id <= currentStage ? 'bg-green-500 text-white' : 'bg-gray-300'
                    }`}
                  >
                    <stage.icon size={24} />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-bold text-lg">{stage.name}</h4>
                    <p className="text-sm text-gray-600">Location: {stage.nameLocation}</p>
                    {stage.id === currentStage && (
                      <p className="text-sm text-blue-600 mt-1 flex items-center">
                        <Clock size={16} className="mr-1" />
                        In progress...
                      </p>
                    )}
                    {stage.id < currentStage && (
                      <p className="text-sm text-green-600 mt-1 flex items-center">
                        <CheckCircle size={16} className="mr-1" />
                        Completed
                      </p>
                    )}
                  </div>

                  {/* Line connecting stages */}
                  {index < trackingStages.length - 1 && (
                    <div
                      className={`absolute left-6 ml-[1px] w-0.5 h-20 ${
                        stage.id < currentStage ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Delivery Section */}
          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Estimated Delivery</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">Thursday, May 25</p>
                <p className="text-gray-600">Between 2:00 PM - 5:00 PM</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Carrier</p>
                <p className="font-bold">FedEx</p>
              </div>
            </div>
          </div>

          {/* Delivery Instructions */}
          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Delivery Instructions</h3>
            <div className="flex items-start space-x-4">
              <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-1" />
              <p className="text-gray-700">
                Please leave the package at the front door if no one answers. Thank you!
              </p>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200">
                Contact Support
              </button>
              <button className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors duration-200">
                FAQs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
