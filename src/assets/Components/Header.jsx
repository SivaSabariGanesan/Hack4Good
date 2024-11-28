import React, { useState } from 'react';
import { ShoppingCart, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CartSlideOver from '../Components/CartSlideOver';

const Header = ({ order, onViewHistory, user, setUser }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Navigate to checkout page
  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Logout user
  const handleLogout = () => {
    setUser(null);
    navigate('/'); // Redirect to login page
  };

  // Navigate to profile page
  const handleProfile = () => {
    navigate('/profile');
  };

  // Navigate to settings page
  const handleSettings = () => {
    navigate('/settings');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // View order history
  const handleOrderHistory = () => {
    onViewHistory();
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Fresh Food Market</a>
      </div>
      <div className="flex-none">
        {/* Cart Icon */}
        <div className="dropdown dropdown-end">
          <div
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="indicator">
              <ShoppingCart className="h-5 w-5" />
              {order?.length > 0 && (
                <span className="badge badge-sm indicator-item">{order.length}</span>
              )}
            </div>
          </div>
        </div>

        {/* Order History Icon */}
        <div
          role="button"
          className="btn btn-ghost btn-circle"
          onClick={handleOrderHistory}
        >
          <History className="h-5 w-5 mr-4" />
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            role="button"
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar"
            onClick={toggleDropdown}
          >
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src={user?.picture || 'https://via.placeholder.com/150'}
              />
            </div>
          </div>

          {isDropdownOpen && (
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a onClick={handleProfile}>
                  Profile
                  <span className="text-xs">{user?.email || ''}</span>
                </a>
              </li>
              <li>
                <a onClick={handleSettings}>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Cart SlideOver */}
      <CartSlideOver
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        order={order}
        onCheckout={handleCheckout}
        onViewHistory={onViewHistory}
      />
    </div>
  );
};

export default Header;
