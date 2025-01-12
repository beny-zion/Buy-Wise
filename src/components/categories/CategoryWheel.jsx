import { useCategories } from '../../contexts/CategoryContext';
import MainCategory from './MainCategory';
// import SubCategories from './SubCategories';
import { X } from 'lucide-react';

const CategoryWheel = () => {
  const { categories, isWheelOpen, setIsWheelOpen } = useCategories();

  if (!isWheelOpen) return null;

  return (
    <div className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-40 transition-all duration-300">
      <div className="max-w-[550px] mx-auto px-4 py-6" dir="rtl">
        <button
          onClick={() => setIsWheelOpen(false)}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
          {categories.map(category => (
            <MainCategory
              key={category._id}
              category={category}
            />
          ))}
        </div>
        
        {/* <SubCategories /> */}
      </div>
    </div>
  );
};

export default CategoryWheel;