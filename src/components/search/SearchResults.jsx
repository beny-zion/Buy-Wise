import { useState, useEffect } from 'react';
import { Search, Tag, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { searchAll } from '../../services/api/search';

const SearchResults = ({ query }) => {
  const [results, setResults] = useState({
    products: [],
    categories: [],
    vendors: []
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query?.trim()) {
      setResults({ products: [], categories: [], vendors: [] });
      return;
    }

    // const searchItems = async () => {
    //   setLoading(true);
    //   try {
    //     const data = await searchAll(query);
    //     if (data.success) {
    //       setResults(data.results);
    //     }
    //   } catch (error) {
    //     console.error('Error searching:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const debounce = setTimeout(searchItems, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  if (loading) {
    return (
      <div className="absolute top-full left-0 right-0 w-full max-w-[550px] mx-auto bg-white shadow-lg rounded-b-lg border-t p-4 z-50">
        <div className="animate-pulse flex flex-col gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 w-full max-w-[550px] mx-auto bg-white shadow-lg rounded-b-lg border-t z-50">
      <ResultSection
        title="מוצרים"
        items={results.products}
        icon={<Search className="w-4 h-4" />}
        onItemClick={(item) => navigate(`/product/${item._id}`)}
      />
      
      <ResultSection
        title="קטגוריות"
        items={results.categories}
        icon={<Tag className="w-4 h-4" />}
        onItemClick={(item) => navigate(`/category/${item.slug}`)}
      />
      
      <ResultSection
        title="מוכרים"
        items={results.vendors}
        icon={<User className="w-4 h-4" />}
        onItemClick={(item) => navigate(`/vendor/${item._id}`)}
      />
    </div>
  );
};

const ResultSection = ({ title, items, icon, onItemClick }) => {
  if (!items?.length) return null;

  return (
    <div className="py-2" dir="rtl">
      <div className="px-4 py-2 text-sm font-medium text-gray-500 flex items-center gap-2">
        {icon}
        {title}
      </div>
      <div className="divide-y">
        {items.map(item => (
          <button
            key={item._id}
            onClick={() => onItemClick(item)}
            className="w-full px-4 py-2 text-right hover:bg-gray-50 transition-colors flex items-center gap-3"
          >
            {item.image && (
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            {item.icon && (
              <span className="text-xl">{item.icon}</span>
            )}
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              {item.description && (
                <div className="text-sm text-gray-500 truncate">
                  {item.description}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;