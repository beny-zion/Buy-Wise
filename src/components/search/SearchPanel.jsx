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
    <div className="relative">
      <div className="max-w-[550px] mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="חיפוש מוצרים וקטגוריות..."
            className="w-full h-8 pl-10 pr-4 rounded-lg 
                     border border-gray-200
                     bg-white/90
                     focus:outline-none  /* הסרת המסגרת השחורה */
                     focus:border-[#FFA066]  /* צבע המסגרת בזמן פוקוס */
                     focus:ring-0      /* הסרת הטבעת */
                     transition-all duration-200
                     placeholder-gray-400 text-gray-700"
            dir="rtl"
          />
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 
                     text-[#FFA066] transition-colors duration-200" 
            size={20}
          />
        </div>
      </div>

      {showResults && searchQuery.trim() && <SearchResults query={searchQuery} />}
    </div>
  );
};

export default SearchPanel;