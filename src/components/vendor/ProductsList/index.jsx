// components/vendor/ProductsList/index.jsx
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

const ProductsList = ({ products = [] }) => {  // הוספת ערך ברירת מחדל
  const [filters, setFilters] = useState({
    sortBy: 'date',
    category: 'all',
    search: ''
  });

  // פילטור המוצרים
  const getFilteredProducts = () => {
    if (!Array.isArray(products)) {
      console.error('Products is not an array:', products);
      return [];
    }

    return products
      .filter(product => {
        if (!product) return false;

        // סינון לפי חיפוש
        if (filters.search && 
            !product.recommendation?.toLowerCase().includes(filters.search.toLowerCase())) {
          return false;
        }
        
        // סינון לפי קטגוריה
        if (filters.category !== 'all' && 
            !product.mainCategory?.includes(filters.category)) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // מיון המוצרים
        switch (filters.sortBy) {
          case 'views':
            return (b.stats?.views || 0) - (a.stats?.views || 0);
          case 'clicks':
            return (b.stats?.clicks || 0) - (a.stats?.clicks || 0);
          default: // date
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
      });
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div>
      <ProductFilters 
        filters={filters} 
        onChange={setFilters} 
        className="mb-6" 
      />

      {!products?.length ? (
        <div className="text-center py-10 text-gray-500">
          אין מוצרים להצגה
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          לא נמצאו מוצרים מתאימים לחיפוש
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product._id} 
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;