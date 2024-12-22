import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useAddress } from '../hooks/useAddress';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { AddressForm } from '../components/AddressForm';
import { MapPin, Plus } from 'lucide-react';

export const Checkout = () => {
  const { state: shopState } = useShop();
  const { addresses } = useAddress();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [showAddressForm, setShowAddressForm] = useState(false);

  const total = shopState.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      showToast('Please select a delivery address', 'error');
      return;
    }

    // Here you would typically make an API call to create the order
    showToast('Order placed successfully!', 'success');
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Checkout</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Delivery Address</h3>
              <button
                onClick={() => setShowAddressForm(true)}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Address</span>
              </button>
            </div>

            {showAddressForm ? (
              <AddressForm onClose={() => setShowAddressForm(false)} />
            ) : (
              <div className="space-y-4">
                {addresses.map(address => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer ${
                      selectedAddressId === address.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-600'
                    }`}
                    onClick={() => setSelectedAddressId(address.id)}
                  >
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                      <div className="ml-3">
                        <p className="font-medium">{address.name}</p>
                        <p className="text-gray-600">{address.street}</p>
                        <p className="text-gray-600">
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p className="text-gray-600">{address.phone}</p>
                        {address.isDefault && (
                          <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            Default Address
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            {shopState.cart.map(item => (
              <div key={item.id} className="flex items-center space-x-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Payment Method</h4>
              <div className="border rounded-lg p-4 bg-gray-50">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked
                    readOnly
                    className="h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Cash on Delivery</span>
                </label>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};