import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ChevronRight, User } from 'lucide-react';
import AddProductForm from '../../components/products/AddProductForm';

const AddProductPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-100 py-12">
      {/* Navigation Buttons */}
      <div className="fixed top-4 right-4 flex gap-2 z-10">
        <button 
          onClick={() => navigate('/')}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          title="דף הבית"
        >
          <Home className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          title="חזור אחורה"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
        {/* <button 
          onClick={() => navigate('/profile')}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          title="פרופיל"
        >
          <User className="w-5 h-5 text-gray-600" />
        </button> */}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                הוספת מוצר חדש
              </h1>
              <Link
                to="/products"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                חזרה לרשימת המוצרים
              </Link>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                איך להוסיף מוצר?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>פתח את המוצר באלי אקספרס</li>
                <li>העתק את קוד ה-HTML של המוצר</li>
                <li>הדבק את הקוד בשדה המתאים</li>
                <li>כתוב המלצה אישית על המוצר</li>
              </ol>
            </div>

            <AddProductForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Home, ChevronRight } from 'lucide-react';
// import AddProductForm from '../../components/products/AddProductForm';
// import { CategoryProvider } from '../../contexts/CategoryContext'; // ייבוא ה-Provider

// const AddProductPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative min-h-screen bg-gray-100 py-12">
//       {/* Navigation Buttons */}
//       <div className="fixed top-4 right-4 flex gap-2 z-10">
//         <button 
//           onClick={() => navigate('/')}
//           className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
//           title="דף הבית"
//         >
//           <Home className="w-5 h-5 text-gray-600" />
//         </button>
//         <button 
//           onClick={() => navigate(-1)}
//           className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
//           title="חזור אחורה"
//         >
//           <ChevronRight className="w-5 h-5 text-gray-600" />
//         </button>
//       </div>

//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//           <div className="p-6 bg-white border-b border-gray-200">
//             <div className="flex items-center justify-between mb-6">
//               <h1 className="text-2xl font-semibold text-gray-900">
//                 הוספת מוצר חדש
//               </h1>
//               <Link
//                 to="/products"
//                 className="text-sm text-blue-600 hover:text-blue-500"
//               >
//                 חזרה לרשימת המוצרים
//               </Link>
//             </div>
            
//             <div className="bg-gray-50 p-4 rounded-md mb-6">
//               <h2 className="text-lg font-medium text-gray-900 mb-2">
//                 איך להוסיף מוצר?
//               </h2>
//               <ol className="list-decimal list-inside space-y-2 text-gray-600">
//                 <li>בחר קטגוריה ראשית ותת-קטגוריות מתאימות</li>
//                 <li>פתח את המוצר באלי אקספרס</li>
//                 <li>העתק את קוד ה-HTML של המוצר</li>
//                 <li>הדבק את הקוד בשדה המתאים</li>
//                 <li>כתוב המלצה אישית על המוצר</li>
//               </ol>
//             </div>

//             <CategoryProvider>
//               <AddProductForm />
//             </CategoryProvider>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductPage;