import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

export const Favorites = () => {
  const { state } = useShop();

  if (state.favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your favorites list is empty</h2>
        <p className="text-gray-600">Start adding some products to your favorites!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {state.favorites.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};