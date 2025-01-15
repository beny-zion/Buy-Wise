// components/vendor/ProductsList/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, MousePointer, Clock } from 'lucide-react';
import StatsCard from '../common/StatsCard';

const ProductCard = ({ product }) => {
  // ערכי ברירת מחדל לסטטיסטיקות
  const stats = {
    views: 0,
    clicks: 0,
    avgViewTime: 0,
    ...product.stats  // מיזוג עם הסטטיסטיקות האמיתיות אם הן קיימות
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg 
                    transform hover:-translate-y-1 transition-all duration-200 overflow-hidden
                    border border-gray-100">
      {/* תמונת מוצר */}
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt="תמונת המוצר"
          className="w-full h-48 object-cover"
        />
        {/* אפקט הדרגתי לתמונה */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <div className="p-5" dir="rtl">
        {/* תיאור המוצר */}
        <p className="text-gray-700 text-sm leading-relaxed mb-5 line-clamp-2">
          {product.recommendation}
        </p>

        {/* סטטיסטיקות */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <StatsCard
            icon={<Eye className="w-4 h-4" />}
            label="צפיות"
            value={stats.views.toLocaleString()}
          />
          <StatsCard
            icon={<MousePointer className="w-4 h-4" />}
            label="קליקים"
            value={stats.clicks.toLocaleString()}
          />
          <StatsCard
            icon={<Clock className="w-4 h-4" />}
            label="זמן צפייה"
            value={`${stats.avgViewTime?.toFixed(1) || 0}s`}
          />
        </div>

        {/* כפתור פרטים */}
        <Link
          to={`/vendor/products/${product._id}`}
          className="block w-full text-center py-2.5 px-4 
                   bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                   text-white font-medium rounded-lg
                   transform hover:translate-y-[-1px] hover:shadow-md 
                   active:translate-y-[1px]
                   transition-all duration-200"
        >
          צפה בפרטים
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;