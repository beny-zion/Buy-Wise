// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Heart } from 'lucide-react';

// const ProductCard = ({ product }) => {
//   return (
//     <Link 
//       to={`/products/${product._id}`}
//       className="block bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-102"
//     >
//       {/* תמונת המוצר */}
//       <div className="relative">
//         <img 
//           src={product.imageUrl} 
//           alt="תמונת המוצר"
//           className="w-full aspect-square object-cover"
//         />
//         <button 
//           className="absolute top-2 left-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center
//                     hover:bg-white transition-colors"
//           onClick={(e) => {
//             e.preventDefault();
//             // TODO: הוספת לוגיקת לייק
//           }}
//         >
//           <Heart className="w-5 h-5 text-gray-600" />
//         </button>
//       </div>

//       {/* מידע על המוצר */}
//       <div className="p-3">
//         {/* פרטי המוכר */}
//         <div className="flex items-center space-x-2 mb-2">
//           <img
//             src={product.vendorId.profileImage || '/default-avatar.png'}
//             alt={product.vendorId.fullName}
//             className="w-6 h-6 rounded-full"
//           />
//           <span className="text-xs text-gray-600">
//             {product.vendorId.fullName}
//           </span>
//         </div>

//         {/* המלצת המוכר */}
//         <p className="text-sm text-gray-800 line-clamp-2">
//           {product.recommendation}
//         </p>

//         {/* סטטיסטיקות */}
//         <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
//           <span>{product.stats?.views || 0} צפיות</span>
//           <span>{new Date(product.createdAt).toLocaleDateString()}</span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;
import React from 'react';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div 
  className="h-screen w-full flex items-center justify-center bg-gray-100"
  style={{ 
    height: 'calc(100vh - 100px)',  // נחשב את הגובה הזמין
    marginTop: '50px',              // נקבע את המרחק מסרגל החיפוש
    marginBottom: '5px'           // נקבע את המרחק מהתחתית
  }}
>
<div
        className="relative w-full max-w-xs sm:max-w-sm bg-white rounded-lg overflow-hidden shadow-lg"
        style={{ height: 'calc(100vh - 75px)', marginTop: '80px' }} // Adjust according to the search bar height
      >
        {/* תמונת המוצר */}
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        {/* כפתור לייק */}
        <button 
          className="absolute top-4 left-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center
                     hover:bg-white transition-colors"
        >
          <Heart className="w-6 h-6 text-gray-600" />
        </button>

        {/* Overlay למידע */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          {/* פרטי המוכר */}
          <div className="flex items-center space-x-2 mb-4" dir="rtl">
            <img
              src={product.vendorId?.profileImage || '/default-avatar.png'}
              alt={product.vendorId?.fullName}
              className="w-10 h-10 rounded-full border border-white/20"
            />
            <div className="text-white">
              <div className="font-medium">{product.vendorId?.fullName}</div>
              <div className="text-sm opacity-80">{product.vendorId?.bio}</div>
            </div>
          </div>

          {/* המלצת המוכר */}
          <p className="text-white mb-6 text-right" dir="rtl">
            {product.recommendation}
          </p>

          {/* כפתור רכישה */}
          <button
            onClick={(e) => {
              e.preventDefault();
              window.open(product.affiliateLink, '_blank');
              // if (onAffiliateLinkClick) {
              //   onAffiliateLinkClick();
              // }
            }}
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-lg 
                     transition-colors duration-200 font-medium"
          >
            לרכישה באלי אקספרס
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;