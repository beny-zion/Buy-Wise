/* needed */
// components/ProductViewer/ProductCard/index.jsx
import React, { useState } from 'react';
import { Heart, ShoppingCart, ExternalLink } from 'lucide-react';
import { useProductViewer } from '../../../contexts/ProductViewerContext';
import { formatPrice } from '../../../utils/formatters';

/**
 * רכיב כרטיס מוצר לתצוגת גריד
 */
const ProductCard = ({ product, onClick }) => {
  const { 
    isProductFavorite,
    toggleFavorite,
    handleAffiliateClick
  } = useProductViewer();
  
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const isFavorite = isProductFavorite(product._id);

  // טיפול במועדפים
  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    const result = await toggleFavorite(product._id);
    if (!result.success && result.message) {
      // כאן אפשר להוסיף טוסט הודעה
      console.log(result.message);
    }
  };

  // טיפול בקליק על קישור אפיליאט
  const handleBuyClick = (e) => {
    e.stopPropagation();
    handleAffiliateClick(product._id);
    window.open(product.affiliateLink, '_blank');
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* תמונת מוצר */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageError ? '/placeholder-image.jpg' : (product.displayImage || product.imageUrl)}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
        />
        
        {/* שכבת אוברליי בהובר */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium text-sm">
              צפה בפרטים
            </span>
          </div>
        </div>

        {/* כפתור מועדפים */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors duration-200"
          aria-label={isFavorite ? 'הסר ממועדפים' : 'הוסף למועדפים'}
        >
          <Heart 
            size={20} 
            className={`transition-colors duration-200 ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* תג הנחה */}
        {product.aliExpressData?.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.aliExpressData.discount}
          </div>
        )}
      </div>

      {/* פרטי מוצר */}
      <div className="p-4">
        {/* כותרת */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 min-h-[48px]">
          {product.title}
        </h3>

        {/* מחיר ודירוג */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(product.aliExpressData?.price || 0)}
            </div>
            {product.aliExpressData?.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(product.aliExpressData.originalPrice)}
              </div>
            )}
          </div>

          {product.aliExpressData?.stats?.rating && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-600">
                {product.aliExpressData.stats.rating}
              </span>
            </div>
          )}
        </div>

        {/* פרטי ממליץ */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
          <img
            src={product.vendorId?.profileImage || '/default-avatar.png'}
            alt={product.vendorId?.fullName || 'ממליץ'}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600">
            המלצה של {product.vendorId?.fullName || 'ממליץ'}
          </span>
        </div>

        {/* כפתורי פעולה */}
        <div className="flex gap-2">
          <button
            onClick={handleBuyClick}
            className="flex-1 bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] text-white py-2 px-4 rounded-lg 
                     flex items-center justify-center gap-2 text-sm font-medium
                     hover:shadow-md transition-all duration-200"
          >
            <ShoppingCart size={16} />
            <span>קנה עכשיו</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            aria-label="צפה בפרטים"
          >
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

