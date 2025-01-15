// components/vendor/ProductsList/ProductFilters.jsx
import React from 'react';
import { Search } from 'lucide-react';

const ProductFilters = ({ filters, onChange, className = '' }) => {
  // טיפול בשינוי חיפוש
  const handleSearchChange = (e) => {
    onChange({
      ...filters,
      search: e.target.value
    });
  };

  // טיפול בשינוי מיון
  const handleSortChange = (e) => {
    onChange({
      ...filters,
      sortBy: e.target.value
    });
  };

  // טיפול בשינוי קטגוריה
  const handleCategoryChange = (e) => {
    onChange({
      ...filters,
      category: e.target.value
    });
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* חיפוש */}
        <div className="relative">
          <input
            type="text"
            placeholder="חיפוש מוצר..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* מיון */}
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="date">תאריך - חדש לישן</option>
          <option value="views">צפיות - מהגבוה לנמוך</option>
          <option value="clicks">קליקים - מהגבוה לנמוך</option>
        </select>

        {/* סינון לפי קטגוריה */}
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">כל הקטגוריות</option>
          <option value="electronics">אלקטרוניקה</option>
          <option value="fashion">אופנה</option>
          <option value="home">בית וגן</option>
          <option value="beauty">יופי וטיפוח</option>
          {/* אפשר להוסיף עוד קטגוריות */}
        </select>
      </div>

      {/* תצוגת פילטרים פעילים */}
      {(filters.search || filters.category !== 'all') && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.search && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              חיפוש: {filters.search}
              <button
                onClick={() => onChange({ ...filters, search: '' })}
                className="mr-2 hover:text-blue-600"
              >
                ×
              </button>
            </div>
          )}
          {filters.category !== 'all' && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              קטגוריה: {filters.category}
              <button
                onClick={() => onChange({ ...filters, category: 'all' })}
                className="mr-2 hover:text-blue-600"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;