import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, error, hasMore, onLoadMore }) => {
  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-white bg-red-500/10 rounded-lg p-4 mt-4">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-full
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'טוען...' : 'טען עוד'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
