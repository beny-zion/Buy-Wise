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
import React ,{ useState }from 'react';
import { Heart ,Share2} from 'lucide-react';
import { useProductTracking } from './hooks/useProductTracking';

const ProductCard = ({ product }) => {
  if (!product) return null;
    const [shareOpen, setShareOpen] = useState(false);
  
  const { handleAffiliateClick } = useProductTracking(product._id);

  const onAffiliateClick = (e) => {
    e.preventDefault();
    handleAffiliateClick();
    window.open(product.affiliateLink, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'שיתוף מוצר',
        url: window.location.href,
      });
    } else {
      setShareOpen(true);
      navigator.clipboard.writeText(window.location.href);
      setTimeout(() => setShareOpen(false), 2000);
    }
  };

  return (
    <div 
      className="h-screen w-full flex items-center justify-center bg-gray-100"
      style={{ 
        height: 'calc(100vh - 100px)',
        marginTop: '50px',
        marginBottom: '5px'
      }}
    >
      <div
        className="relative w-full max-w-xs sm:max-w-sm bg-white rounded-lg overflow-hidden shadow-lg"
        style={{ height: 'calc(100vh - 75px)', marginTop: '80px' }}
      >
        {/* תמונת המוצר */}
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        
        {/* כפתור שיתוף */}
        <div className="absolute top-3 left-3">
          <button 
            onClick={handleShare}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white 
                     transition-all duration-200 hover:shadow-lg"
          >
            <Share2 className="w-5 h-5 text-gray-700" />
          </button>
          {shareOpen && (
            <div className="absolute top-12 left-0 bg-black/80 backdrop-blur-sm text-white 
                          text-xs py-1.5 px-3 rounded-full whitespace-nowrap">
              הקישור הועתק!
            </div>
          )}
        </div>

        {/* אזור המידע */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent 
                      pt-20 pb-6 px-4">
          {/* פרטי המוכר */}
          <div className="flex items-center gap-3 mb-4" dir="rtl">
            <img
              src={product.vendorId?.profileImage || '/default-avatar.png'}
              alt={product.vendorId?.fullName}
              className="w-12 h-12 rounded-full border-2 border-white/20"
            />
            <div className="text-white">
              <div className="font-medium">{product.vendorId?.fullName}</div>
              <div className="text-sm text-white/80">{product.vendorId?.bio}</div>
            </div>
          </div>

          {/* המלצת המוכר וכפתור */}
          <div className="flex flex-col gap-4" dir="rtl">
            <p className="text-white/90 text-sm leading-relaxed">
              {product.recommendation}
            </p>

            {/* אזור תחתון עם כפתור */}
            <div className="flex justify-start items-center mt-2">
              <button
                onClick={onAffiliateClick}
                className="bg-[#FFA066] hover:bg-[#FF8C3D] text-white px-6 py-2.5 
                         rounded-full text-sm font-medium shadow-lg 
                         transition-all duration-200 hover:shadow-xl 
                         hover:scale-105 active:scale-95"
              >
                לרכישה באלי אקספרס
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;