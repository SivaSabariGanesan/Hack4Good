import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CreditCard } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use the cart items passed from CartSlideOver
  const [order, setOrder] = useState([]);
  const [activeTab, setActiveTab] = useState('details');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);

  // Load cart items from navigation state
  useEffect(() => {
    const cartItems = location.state?.cartItems || [];
    setOrder(cartItems);
  }, [location.state]);

  // Load order history from local storage
  useEffect(() => {
    const storedOrders = localStorage.getItem('orderHistory');
    if (storedOrders) {
      setOrderHistory(JSON.parse(storedOrders));
    }
  }, []);

  const subtotal = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newOrderId = Math.random().toString(36).substr(2, 9);
    setOrderId(newOrderId);
    setIsOrderPlaced(true);

    // Save the order to local storage
    const newOrder = { 
      orderId: newOrderId, 
      order, 
      total, 
      date: new Date().toLocaleDateString() 
    };
    const updatedHistory = [...orderHistory, newOrder];
    setOrderHistory(updatedHistory);
    localStorage.setItem('orderHistory', JSON.stringify(updatedHistory));
  };

  const handleTrackOrder = (orderId) => {
    navigate(`/tracking/${orderId}`, {
      state: { 
        order, 
        address: '123 Main St, City, Country' 
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {isOrderPlaced ? (
            <div className="text-center py-16">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-8">Your order ID is: {orderId}</p>
              <button
                onClick={() => handleTrackOrder(orderId)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Track Your Order
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Your Items</h3>
                <div className="space-y-4 mb-6">
                  {order.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-md" 
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div>
                    <label 
                      htmlFor="cardNumber" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="expDate" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        id="expDate"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="MM / YY"
                        required
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="cvv" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
