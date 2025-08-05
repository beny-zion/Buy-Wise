/* needed */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut, Edit, Home, X as XIcon, Heart,ChevronRight } from 'lucide-react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileEditForm from '../../components/profile/ProfileEditForm';
import ProfileStats from '../../components/profile/ProfileStats';
import { useAuth } from '../../contexts/AuthContext';
import logoSvg from '../../assets/logo/new.svg';
import { MessageCircle } from 'lucide-react';
import { useVendorNotifications } from '../../hooks/useVendorNotifications';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { unreadCount } = useVendorNotifications();

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (!user) return <div className="flex justify-center p-8">Please login</div>;

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
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* לוגו */}
        <div className="flex justify-center mb-8">
          <img
            src={logoSvg}
            alt="BuyWise"
            className="h-12 w-auto"
          />
        </div>
        {/* כפתור חזרה */}
        {/* <button
          onClick={() => navigate('/')}
          className="fixed top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm 
                   rounded-full shadow-md hover:shadow-lg hover:scale-105 
                   transition-all duration-200"
          aria-label="חזור לדף הבית"
        >
          <Home className="w-5 h-5 text-[#FFA066]" />
        </button> */}
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
          onClick={() => navigate("/")}
          className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
                   hover:shadow-lg hover:scale-105 transition-all duration-200"
          title="חזור אחורה"
        >
          <ChevronRight className="w-5 h-5 text-[#FFA066]" />
        </button>
      </div>

        <div className="max-w-screen-md mx-auto space-y-8">
          <ProfileHeader user={user} />

          {isEditing ? (
            <div className="relative bg-white rounded-2xl shadow-lg p-6">
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
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center px-6 py-3.5 
                         bg-white text-[#FFA066] border-2 border-[#FFA066] 
                         rounded-xl hover:bg-[#FFA066] hover:text-white
                         transition-all duration-200 shadow-sm hover:shadow-md
                         group"
              >
                <Edit className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                <span className="font-medium">ערוך פרופיל</span>
              </button>

              <button
                onClick={() => navigate('/addProducts')}
                className="flex items-center justify-center px-6 py-3.5 
                         bg-[#FFA066] text-white rounded-xl
                         hover:bg-[#FF8C3D] transition-all duration-200
                         shadow-md hover:shadow-lg group"
              >
                <PlusCircle className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                <span className="font-medium">הוסף מוצר</span>
              </button>

              <button
                onClick={() => navigate('/favorites')}
                className="flex items-center justify-center px-6 py-3.5
             bg-white text-[#FF6B6B] border-2 border-[#FF6B6B]
             hover:bg-[#FF6B6B] hover:text-white
             rounded-xl transition-all duration-200
             shadow-sm hover:shadow-md group"
              >
                <Heart className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                <span className="font-medium">מוצרים שאהבתי</span>
              </button>

              {user?.isVendor && (
  <button
    onClick={() => navigate('/vendorPrivate/questions')}
    className="flex items-center justify-center px-6 py-3.5
               bg-white text-blue-600 border-2 border-blue-600
               hover:bg-blue-600 hover:text-white
               rounded-xl transition-all duration-200
               shadow-sm hover:shadow-md group relative"
  >
    <MessageCircle className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
    <span className="font-medium">ניהול שאלות</span>
    {/* אינדיקטור לשאלות חדשות */}
    {unreadCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                     w-6 h-6 rounded-full flex items-center justify-center font-bold">
        {unreadCount}
      </span>
    )}
  </button>
)}

              <button
                onClick={() => navigate('/vendorPrivate/productsVendor')}
                className="flex items-center justify-center px-6 py-3.5
                         bg-white text-gray-700 border-2 border-gray-200
                         rounded-xl hover:bg-gray-50 transition-all duration-200
                         shadow-sm hover:shadow-md group"
              >
                <span className="font-medium">המוצרים שלי</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center px-6 py-3.5
                         bg-white text-red-500 border-2 border-red-500
                         rounded-xl hover:bg-red-500 hover:text-white
                         transition-all duration-200 shadow-sm hover:shadow-md
                         group"
              >
                <LogOut className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                <span className="font-medium">התנתק</span>
              </button>
            </div>
          )}



          <div className="pb-6">
            <ProfileStats user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;