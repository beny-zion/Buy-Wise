import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecommenderCircle = ({ vendor }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!vendor) return null;

  return (
    <div className="relative"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         onClick={(e) => e.stopPropagation()}>
      <Link to={`/vendors/${vendor._id}`}>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20
                      hover:border-white/40 transition-colors">
          <img
            src={vendor.profileImage || '/default-avatar.png'}
            alt={vendor.fullName}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      
      {isHovered && (
        <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg p-3 w-48 z-50
                      animate-fadeIn">
          <div className="flex items-center space-x-3 mb-2">
            <img
              src={vendor.profileImage || '/default-avatar.png'}
              alt={vendor.fullName}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {vendor.fullName}
              </div>
              <div className="text-xs text-gray-500">
                {vendor.productsCount || 0} המלצות
              </div>
            </div>
          </div>
          
          <button 
            className="w-full bg-blue-600 text-white text-sm rounded-full py-1.5 
                     hover:bg-blue-700 transition-colors"
          >
            עקוב
          </button>
        </div>
      )}
    </div>
  );
};

// export default RecommenderCircle;