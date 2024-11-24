import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from 'lucide-react';
import CartSlideOver from '../Components/CartSlideOver';

const foodItems = [
  { id: 1, name: "Tomato", image: "https://images.unsplash.com/photo-1546470427-f5c9439c4748?w=800&auto=format&fit=crop&q=60", price: 12.99 },
  { id: 2, name: "Fish", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=60", price: 8.99 },
  { id: 3, name: "Potato", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=60", price: 15.99 },
  { id: 4, name: "Beans", image: "https://images.unsplash.com/photo-1551543837-d0a66268d755?w=800&auto=format&fit=crop&q=60", price: 7.99 },
];

export default function Dashboard() {
  const [order, setOrder] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    setQuantities({ ...quantities, [id]: quantity });
  };

  const addToOrder = (item) => {
    const quantity = parseInt(quantities[item.id] || 1, 10);
    const existingItem = order.find((orderItem) => orderItem.id === item.id);

    if (existingItem) {
      setOrder(
        order.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + quantity }
            : orderItem
        )
      );
    } else {
      setOrder([...order, { ...item, quantity }]);
    }

    // Reset quantity after adding to order
    setQuantities({ ...quantities, [item.id]: 1 });
  };

  const goToCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout", { state: { order } });
  };

  const viewOrderHistory = () => {
    setIsCartOpen(false);
    navigate("/order-history");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Fresh Food Market</h1>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            {order.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {order.length}
              </span>
            )}
          </button>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {foodItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                  <span className="font-semibold text-blue-600">${item.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-3">{item.name}</h2>

                <div className="flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, Math.max(1, (quantities[item.id] || 1) - 1))}
                      className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-medium text-gray-800 min-w-[20px] text-center">
                      {quantities[item.id] || 1}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 1) + 1)}
                      className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => addToOrder(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Slide Over */}
        <CartSlideOver
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          order={order}
          onCheckout={goToCheckout}
          onViewHistory={viewOrderHistory}
        />
      </div>
    </div>
  );
}