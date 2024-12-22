import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export const Home = () => {
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {categories.map(category => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 capitalize">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products
              .filter(product => product.category === category)
              .map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};