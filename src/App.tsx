import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ShopProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';
import { AddressProvider } from './context/AddressContext';
import { RequireAuth } from './components/RequireAuth';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Favorites } from './pages/Favorites';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <AddressProvider>
        <ShopProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route 
                  path="/checkout" 
                  element={
                    <RequireAuth>
                      <Checkout />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/favorites" 
                  element={
                    <RequireAuth>
                      <Favorites />
                    </RequireAuth>
                  } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
              <Toaster position="top-right" />
            </div>
          </Router>
        </ShopProvider>
      </AddressProvider>
    </AuthProvider>
  );
}

export default App;