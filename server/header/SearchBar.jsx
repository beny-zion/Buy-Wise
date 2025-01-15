import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onFocus }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="relative w-full max-w-[240px]">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-10 pr-10 pl-4 rounded-full bg-white/10 backdrop-blur-md 
                   border border-white/20 text-white placeholder-white/60
                   focus:outline-none focus:border-white/40"
          placeholder="חיפוש..."
          onFocus={onFocus}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
      </div>

      {/* תוצאות חיפוש */}
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg 
                      border border-gray-100 overflow-hidden z-50">
          <div className="p-2 text-sm text-gray-500">מחפש...</div>
        </div>
      )}
    </div>
  );
};

// export default SearchBar;