import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ChevronRight, User } from 'lucide-react';
import AddProductForm from '../../components/products/AddProductForm';

const AddProductPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* רקע דקורטיבי */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-[#FFA066]/5 rounded-full blur-3xl" />
        <div className="absolute -left-1/4 top-1/3 w-1/2 h-1/2 bg-[#FF6B6B]/5 rounded-full blur-3xl" />
      </div>
 
      {/* כפתורי ניווט */}
      <div className="fixed top-4 right-4 flex gap-2 z-10">
        <button 
          onClick={() => navigate('/')}
          className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
                   hover:shadow-lg hover:scale-105 transition-all duration-200"
          title="דף הבית"
        >
          <Home className="w-5 h-5 text-[#FFA066]" />
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
                   hover:shadow-lg hover:scale-105 transition-all duration-200"
          title="חזור אחורה"
        >
          <ChevronRight className="w-5 h-5 text-[#FFA066]" />
        </button>
      </div>
 
      <div className="max-w-3xl mx-auto px-4 py-8 relative z-0">
        <div className="bg-white/80 backdrop-blur-sm overflow-hidden rounded-2xl shadow-lg">
          <div className="p-8">
            {/* כותרת */}
            <div className="flex items-center justify-between mb-8" dir="rtl">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                           text-transparent bg-clip-text">
                הוספת מוצר חדש
              </h1>
              <Link
                to="/products"
                className="text-sm text-[#FFA066] hover:text-[#FF6B6B] 
                         transition-colors duration-200"
              >
                חזרה לרשימת המוצרים
              </Link>
            </div>
            
            {/* הוראות */}
            <div className="bg-[#FFA066]/5 p-6 rounded-xl mb-8" dir="rtl">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                איך להוסיף מוצר?
              </h2>
              <ol className="space-y-3 text-gray-600">
                {[
                  'פתח את המוצר באלי אקספרס',
                  'העתק את קוד ה-HTML של המוצר',
                  'הדבק את הקוד בשדה המתאים',
                  'כתוב המלצה אישית על המוצר'
                ].map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full 
                                   bg-[#FFA066] text-white text-sm flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
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