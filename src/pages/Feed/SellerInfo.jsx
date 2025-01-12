import React from 'react'

export default function SellerInfo({ currentProduct }) {
  return (
    <div className="relative group">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden cursor-pointer">
            <img 
              src={currentProduct?.vendor?.profileImage || "/api/placeholder/50/50"} 
              alt={currentProduct?.vendor?.fullName || "תמונת פרופיל"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm text-white rounded-lg p-2 mt-2">
            <p className="text-sm">{currentProduct?.vendor?.fullName || "משתמש"}</p>
            <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full mt-1">
              עקוב
            </button>
          </div>
        </div>
  )
}
