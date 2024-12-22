import React from 'react';
import { LogIn, LogOut, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AuthButtons = () => {
  const { isAuthenticated, user, logout } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Hello, {user.name}</span>
        <button
          onClick={logout}
          className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        to="/login"
        className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
      >
        <LogIn className="h-5 w-5" />
        <span>Login</span>
      </Link>
      <Link
        to="/signup"
        className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
      >
        <UserPlus className="h-5 w-5" />
        <span>Sign Up</span>
      </Link>
    </div>
  );
};