// contexts/CategoryContext.jsx
// import { createContext, useContext, useState, useEffect } from 'react';
// import {categoryService} from '../services/api/categories';
// // import axios from 'axios';

// const CategoryContext = createContext();

// export const CategoryProvider = ({ children }) => {
//   const [categories, setCategories] = useState([]);
//   const [selectedMain, setSelectedMain] = useState(null);
//   const [selectedSub, setSelectedSub] = useState(null);
//   const [isWheelOpen, setIsWheelOpen] = useState(false);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const  data  = await categoryService.getActiveCategories();
//         console.log(data.categories)
//         if (data) {
//           setCategories(data.categories);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <CategoryContext.Provider value={{
//       categories,
//       selectedMain,
//       setSelectedMain,
//       selectedSub,
//       setSelectedSub,
//       isWheelOpen,
//       setIsWheelOpen
//     }}>
//       {children}
//     </CategoryContext.Provider>
//   );
// };

// export const useCategories = () => {
//   const context = useContext(CategoryContext);
//   if (!context) {
//     throw new Error('useCategories must be used within a CategoryProvider');
//   }
//   return context;
// };

// export default CategoryContext;
import { createContext, useContext, useState, useEffect } from 'react';
import { categoryService } from '../services/api/categories';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedMain, setSelectedMain] = useState(null);
  const [isWheelOpen, setIsWheelOpen] = useState(false);

  // טעינת קטגוריות
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getActiveCategories();
        if (data?.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // טיפול בבחירת קטגוריה
  const handleCategorySelect = (category) => {
    setSelectedMain(category);
    setIsWheelOpen(false); // סגירת גלגל הקטגוריות אחרי בחירה
  };

  return (
    <CategoryContext.Provider value={{
      categories,
      selectedMain,
      setSelectedMain: handleCategorySelect,
      isWheelOpen,
      setIsWheelOpen,
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};

export default CategoryContext;