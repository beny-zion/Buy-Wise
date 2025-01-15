// components/search/CategorySelector.jsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { categoryService } from '../../services/api/categories';

const CategorySelector = ({ selectedCategories = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAll();
        if (response.success) {
          setCategories(response.categories);
        }
      } catch (err) {
        setError('שגיאה בטעינת קטגוריות');
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = async (category) => {
    try {
      // בדיקה אם הקטגוריה כבר נבחרה
      if (selectedCategories.some(cat => cat._id === category._id)) {
        return;
      }

      // טעינת תתי-קטגוריות אם יש
      // const subCatResponse = await categoryService.getSubCategories(category._id);
      
      // אם יש תתי-קטגוריות, נשמור אותן במצב המקומי
      // if (subCatResponse.success && subCatResponse.subCategories?.length > 0) {
      //   category.subCategories = subCatResponse.subCategories;
      // }

      onChange([...selectedCategories, category]);
    } catch (err) {
      console.error('Error selecting category:', err);
    }
  };

  const handleCategoryRemove = (categoryId) => {
    onChange(selectedCategories.filter(cat => cat._id !== categoryId));
  };

  return (
    <div className="space-y-4" dir="rtl">
      {/* תצוגת קטגוריות נבחרות */}
      <div className="flex flex-wrap gap-2">
  {selectedCategories.map(category => (
    <div
      key={category._id}
      className="inline-flex items-center gap-2 bg-[#FFA066]/10 text-[#FFA066] 
                px-4 py-2 rounded-xl border border-[#FFA066]/20"
    >
      <span className="text-sm font-medium">{category.name}</span>
      <button
        type="button"
        onClick={() => handleCategoryRemove(category._id)}
        className="hover:bg-[#FFA066]/20 rounded-full p-1 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  ))}
</div>

      {/* כפתור להוספת קטגוריה */}
      <button
  type="button"
  onClick={() => setIsOpen(true)}
  className="px-6 py-2.5 text-sm font-medium text-[#FFA066] border-2 border-[#FFA066] 
            rounded-xl hover:bg-[#FFA066]/10 transition-all duration-200"
>
  הוסף קטגוריה
</button>

     {/* מודאל בחירת קטגוריה */}
{isOpen && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-lg w-full 
                  max-h-[80vh] overflow-y-auto shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium text-gray-900">בחר קטגוריה</h3>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="bg-red-50/50 backdrop-blur-sm text-red-600 p-4 rounded-xl mb-4 border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {categories.map(category => (
          <button
            key={category._id}
            type="button"
            onClick={() => {
              handleCategorySelect(category);
              setIsOpen(false);
            }}
            className="p-4 text-right hover:bg-[#FFA066]/10 rounded-xl 
                     transition-all duration-200 border border-gray-100
                     hover:border-[#FFA066]/20"
          >
            <div className="font-medium text-gray-900">{category.name}</div>
          </button>
        ))}
      </div>
    </div>
  </div>
)}
    </div>
  );
};
 
export default CategorySelector;