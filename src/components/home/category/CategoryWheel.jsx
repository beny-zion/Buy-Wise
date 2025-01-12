import React, { useState, useRef, useEffect } from 'react';

const categories = [
  { id: 1, name: 'אופנה', icon: '👕' },
  { id: 2, name: 'אלקטרוניקה', icon: '📱' },
  { id: 3, name: 'בית וגינה', icon: '🏠' },
  { id: 4, name: 'ספורט', icon: '⚽' },
  { id: 5, name: 'יופי', icon: '💄' },
  { id: 6, name: 'צעצועים', icon: '🎮' },
  { id: 7, name: 'תכשיטים', icon: '💍' },
  { id: 8, name: 'אביזרים', icon: '👜' }
];

const subCategories = {
  1: ['חולצות', 'מכנסיים', 'נעליים', 'שמלות', 'אקססוריז'],
  2: ['סמארטפונים', 'מחשבים', 'אוזניות', 'גאדג\'טים'],
  // ... יתר תתי הקטגוריות
};

const CategoryWheel = ({ isOpen, onClose, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const wheelRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wheelRef.current && !wheelRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id === selectedCategory ? null : category.id);
  };

  const handleSubCategoryClick = (subCategory) => {
    onSelectCategory(subCategory);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 animate-fadeIn">
      <div 
        ref={wheelRef}
        className="absolute top-0 right-0 left-0 bg-white rounded-b-2xl p-6 transform transition-transform duration-300"
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(-100%)' }}
      >
        {/* קטגוריות ראשיות */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6 pb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`flex flex-col items-center min-w-[60px] ${
                  selectedCategory === category.id ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="text-sm whitespace-nowrap">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* תת קטגוריות */}
        {selectedCategory && (
          <div className="border-t pt-4">
            <div className="grid grid-cols-3 gap-3">
              {subCategories[selectedCategory]?.map((subCategory, index) => (
                <button
                  key={index}
                  onClick={() => handleSubCategoryClick(subCategory)}
                  className="text-sm text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-100"
                >
                  {subCategory}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryWheel;