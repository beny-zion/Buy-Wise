import { useState } from 'react';
import { Search } from 'lucide-react';
import { useCategories } from '../../contexts/CategoryContext';
import SearchResults from './SearchResults';

const SearchPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setIsWheelOpen } = useCategories();
  const [showResults, setShowResults] = useState(false);

  const handleFocus = () => {
    setIsWheelOpen(true);
    setShowResults(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-lg z-50">
      <div className="w-full max-w-[550px] mx-auto px-4 py-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="חיפוש מוצרים וקטגוריות..."
            className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          
          {showResults && searchQuery.trim() && (
            <SearchResults query={searchQuery} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;