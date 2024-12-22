import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export const Cart = () => {
  const { state, dispatch } = useShop();
  const navigate = useNavigate();
  
  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (state.cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to your cart to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Shopping Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {state.cart.map(item => (
            <div
              key={item.id}
              className="flex items-center space-x-4 border-b py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) },
                      })
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { id: item.id, quantity: item.quantity + 1 },
                      })
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() =>
                  dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })
                }
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 hover:bg-indigo-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};