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
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
          >
            <span>{category.name}</span>
            <button
              type="button"
              onClick={() => handleCategoryRemove(category._id)}
              className="hover:text-blue-900"
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
        className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
      >
        הוסף קטגוריה
      </button>

      {/* מודאל בחירת קטגוריה */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">בחר קטגוריה</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {categories.map(category => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => {
                    handleCategorySelect(category);
                    setIsOpen(false);
                  }}
                  className="p-4 text-right hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="font-medium">{category.name}</div>
                  {/* {category.subCategories?.length > 0 && (
                    <div className="text-sm text-gray-500 mt-1">
                      {category.subCategories.length} תת-קטגוריות
                    </div>
                  )} */}
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