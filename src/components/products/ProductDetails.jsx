import React from 'react';
import { Link } from 'react-router-dom';

const ProductDetails = ({ product }) => {
  const { imageUrl, affiliateLink, recommendation, vendorId } = product;

  return (
    <div className="bg-white overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* תמונת המוצר */}
        <div className="relative">
          <img
            src={imageUrl}
            alt="תמונת המוצר"
            className="w-full h-auto object-cover rounded-lg"
          />
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            לרכישה באלי אקספרס
          </a>
        </div>

        {/* פרטי המוצר */}
        <div className="space-y-6">
          {/* פרטי המוכר */}
          <div className="flex items-center space-x-4">
            <img
              src={vendorId.profileImage || '/default-avatar.png'}
              alt={vendorId.fullName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {vendorId.fullName}
              </h3>
              <Link
                to={`/vendors/${vendorId._id}`}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                צפה בכל ההמלצות
              </Link>
            </div>
          </div>

          {/* ההמלצה */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              ההמלצה שלי על המוצר
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {recommendation}
            </p>
          </div>

          {/* סטטיסטיקות */}
          <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
            <div className="text-center">
              <span className="block text-2xl font-bold text-gray-900">
                {product.stats?.views || 0}
              </span>
              <span className="text-sm text-gray-500">צפיות</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-gray-900">
                {product.stats?.clicks || 0}
              </span>
              <span className="text-sm text-gray-500">קליקים</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-gray-900">
                {product.stats?.avgViewTime ? `${product.stats.avgViewTime}s` : '0s'}
              </span>
              <span className="text-sm text-gray-500">זמן צפייה ממוצע</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;