/* needed */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut, Edit, Home, X as XIcon, Heart, ChevronRight } from 'lucide-react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileEditForm from '../../components/profile/ProfileEditForm';
import ProfileStats from '../../components/profile/ProfileStats';
import { useAuth } from '../../contexts/AuthContext';
import logoSvg from '../../assets/logo/new.svg';
import { MessageCircle, Package } from 'lucide-react';
import { useVendorNotifications } from '../../hooks/useVendorNotifications';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { unreadCount } = useVendorNotifications();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
        {/* רקע דקורטיבי */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-[#FFA066]/5 rounded-full blur-3xl" />
          <div className="absolute -left-1/4 top-1/3 w-1/2 h-1/2 bg-[#FF6B6B]/5 rounded-full blur-3xl" />
        </div>
        <div className="w-8 h-8 border-4 border-[#FFA066] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">יש להתחבר כדי לצפות בפרופיל</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] text-white rounded-xl
                     hover:shadow-lg transition-all duration-300"
          >
            התחבר
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Handle click outside of edit form
  const handlePageClick = () => {
    if (isEditing) {
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-white to-gray-50" onClick={handlePageClick}>
      {/* רקע דקורטיבי */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-[#FFA066]/5 rounded-full blur-3xl" />
        <div className="absolute -left-1/4 top-1/3 w-1/2 h-1/2 bg-[#FF6B6B]/5 rounded-full blur-3xl" />
      </div>

      {/* כפתורי ניווט */}
      <div className="fixed top-4 right-4 flex gap-2 z-50">
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

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl relative">
        {/* לוגו */}
        <div className="flex justify-center mb-6 sm:mb-8 pt-16">
          <img
            src={logoSvg}
            alt="BuyWise"
            className="h-10 sm:h-12 w-auto"
          />
        </div>

        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <ProfileHeader user={user} />

          {isEditing ? (
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6">
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 
                         rounded-full hover:bg-gray-50 transition-all duration-200"
              >
                <XIcon className="w-5 h-5" />
              </button>
              <div onClick={(e) => e.stopPropagation()}>
                <ProfileEditForm
                  user={user}
                  onSave={() => setIsEditing(false)}
                  onCancel={() => setIsEditing(false)}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* ערוך פרופיל */}
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center px-4 sm:px-6 py-3 sm:py-3.5 
                         bg-white/80 text-[#FFA066] border-2 border-[#FFA066] 
                         rounded-2xl hover:bg-[#FFA066] hover:text-white
                         transition-all duration-300 shadow-lg hover:shadow-xl
                         backdrop-blur-sm group transform hover:scale-[1.02]"
              >
                <Edit className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:scale-110" />
                <span className="font-medium text-sm sm:text-base">ערוך פרופיל</span>
              </button>

              {/* הוסף מוצר */}
              <button
                onClick={() => navigate('/addProducts')}
                className="flex items-center justify-center px-4 sm:px-6 py-3 sm:py-3.5 
                         bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] text-white rounded-2xl
                         hover:shadow-xl transition-all duration-300 shadow-lg group
                         transform hover:scale-[1.02]"
              >
                <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:scale-110" />
                <span className="font-medium text-sm sm:text-base">הוסף מוצר</span>
              </button>

              {/* מוצרים שאהבתי */}
              <button
                onClick={() => navigate('/favorites')}
                className="flex items-center justify-center px-4 sm:px-6 py-3 sm:py-3.5
                         bg-white/80 text-[#FF6B6B] border-2 border-[#FF6B6B]
                         hover:bg-[#FF6B6B] hover:text-white backdrop-blur-sm
                         rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl
                         group transform hover:scale-[1.02]"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:scale-110" />
                <span className="font-medium text-sm sm:text-base">מוצרים שאהבתי</span>
              </button>

              {/* ניהול שאלות - רק למוכרים */}
              {user?.isVendor && (
                <button
                  onClick={() => navigate('/vendorPrivate/questions')}
                  className="flex items-center justify-center px-4 sm:px-6 py-3 sm:py-3.5
                           bg-white/80 text-blue-600 border-2 border-blue-600
                           hover:bg-blue-600 hover:text-white backdrop-blur-sm
                           rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl
                           group relative transform hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:scale-110" />
                  <span className="font-medium text-sm sm:text-base">ניהול שאלות</span>
                  {/* אינדיקטור לשאלות חדשות */}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 bg-red-500 text-white text-xs 
                                   w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>
              )}

              {/* המוצרים שלי */}
              <button
                onClick={() => navigate('/vendorPrivate/productsVendor')}
                className="flex items-center justify-center px-4 sm:px-6 py-3 sm:py-3.5
                         bg-white/80 text-gray-700 border-2 border-gray-300
                         rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300
                         shadow-lg hover:shadow-xl backdrop-blur-sm group transform hover:scale-[1.02]"
              >
                <Package className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:scale-110" />
                <span className="font-medium text-sm sm:text-base">המוצרים שלי</span>
              </button>

              {/* התנתק */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center px-4 sm:px-6 py-3 sm:py-3.5
                         bg-white/80 text-red-500 border-2 border-red-500
                         rounded-2xl hover:bg-red-500 hover:text-white
                         transition-all duration-300 shadow-lg hover:shadow-xl
                         backdrop-blur-sm group transform hover:scale-[1.02]"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:scale-110" />
                <span className="font-medium text-sm sm:text-base">התנתק</span>
              </button>
            </div>
          )}

          {/* סטטיסטיקות */}
          <div className="pb-6 sm:pb-8">
            <ProfileStats user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;