import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, dispatch } = useShop();
  const isFavorite = state.favorites.some(item => item.id === product.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: product })}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">${product.price}</span>
          <button
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};