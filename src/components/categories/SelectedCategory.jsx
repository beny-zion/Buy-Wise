// components/categories/SelectedCategory.jsx
import React from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { useCategories } from '../../contexts/CategoryContext';

const SelectedCategory = () => {
  const { selectedMain, setSelectedMain } = useCategories();

  if (!selectedMain) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm py-0.5"> {/* הורדנו shadow-sm והקטנו padding */}
      <div className="max-w-[550px] mx-auto px-4">
        <div className="flex items-center" dir="rtl"> {/* הורדנו justify-between כי אין יותר כפתור סינון */}
          <div className="flex items-center text-sm">
            <div className="flex items-center gap-1 bg-[#FFA066]/10 text-[#FFA066] px-2 py-0.5 rounded-full"> {/* הקטנו gaps ו-padding */}
              <span className="text-base">{selectedMain.icon}</span> {/* הקטנו מ-text-lg ל-text-base */}
              <span className="font-medium text-sm">{selectedMain.name}</span>
              <button 
                onClick={() => setSelectedMain(null)}
                className="hover:bg-[#FFA066]/20 rounded-full p-0.5 -mr-1" /* הקטנו padding ושינינו hover effect */
              >
                <X className="w-3 h-3" /> {/* הקטנו את האייקון */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCategory;