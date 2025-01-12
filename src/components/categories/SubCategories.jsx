import { useEffect, useState } from 'react';
import { useCategories } from '../../contexts/CategoryContext';
import { categoryService } from '../../services/api/categories';

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const { selectedMain, setSelectedSub, setIsWheelOpen } = useCategories();

  // useEffect(() => {
  //   if (!selectedMain) {
  //     setSubCategories([]);
  //     return;
  //   }

  //   const fetchSubCategories = async () => {
  //     try {
  //       const data = await categoryService.getSubCategories(selectedMain._id);
  //       if (data.success) {
  //         setSubCategories(data.subCategories);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching subcategories:', error);
  //     }
  //   };

  //   fetchSubCategories();
  // }, [selectedMain]);

  const handleSubCategorySelect = (subCategory) => {
    setSelectedSub(subCategory);
    setIsWheelOpen(false);
  };

  if (!selectedMain || !subCategories.length) return null;

  return (
    <div className="mt-4 border-t pt-4">
      <div className="text-sm font-medium text-gray-500 mb-3">
        {selectedMain.name} - קטגוריות משנה
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {subCategories.map(subCategory => (
          <button
            key={subCategory._id}
            onClick={() => handleSubCategorySelect(subCategory)}
            className="p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all text-right border"
          >
            {subCategory.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubCategories;