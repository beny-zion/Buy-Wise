// CategoryWheel.jsx
import { useCategories } from '../../contexts/CategoryContext';
import MainCategory from './MainCategory';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryWheel = () => {
  const { categories, isWheelOpen, setIsWheelOpen } = useCategories();
  const wheelRef = useRef(null);
  const scrollRef = useRef(null);

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isWheelOpen && wheelRef.current && !wheelRef.current.contains(event.target)) {
        setIsWheelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isWheelOpen, setIsWheelOpen]);

  // Scroll Handlers
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!isWheelOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="fixed top-[65px] left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-40 py-[0.5px]"    >
      <div 
        ref={wheelRef} 
        className="max-w-[550px] mx-auto px-4 py-3 relative" 
        dir="rtl"
      >
        {/* כפתור סגירה */}
        {/* <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsWheelOpen(false)}
          className="absolute top-3 left-4 p-1.5 rounded-full hover:bg-gray-100
                     text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </motion.button> */}

        {/* כפתורי גלילה */}
        <div className="relative">
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                     p-1.5 rounded-full bg-white/80 shadow-md
                     text-gray-400 hover:text-gray-600
                     transition-all hover:shadow-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* רשימת הקטגוריות */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto py-2 px-6 gap-3 scrollbar-hide
                     scroll-smooth relative"
          >
            {categories.map(category => (
              <MainCategory
                key={category._id}
                category={category}
              />
            ))}
          </div>

          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                     p-1.5 rounded-full bg-white/80 shadow-md
                     text-gray-400 hover:text-gray-600
                     transition-all hover:shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryWheel;