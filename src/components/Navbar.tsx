import React from 'react';
import { ShoppingCart, Heart, Home } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { AuthButtons } from './AuthButtons';

export const Navbar = () => {
  const { state } = useShop();
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl">ShopHub</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <AuthButtons />
            <div className="flex items-center space-x-4">
              <Link to="/favorites" className="relative p-2">
                <Heart className="h-6 w-6 text-gray-600 hover:text-indigo-600" />
                {state.favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {state.favorites.length}
                  </span>
                )}
              </Link>
              
              <Link to="/cart" className="relative p-2">
                <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-indigo-600" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};