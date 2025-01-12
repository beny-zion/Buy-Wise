import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut, Edit, Home, X as XIcon } from 'lucide-react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileEditForm from '../../components/profile/ProfileEditForm';
import ProfileStats from '../../components/profile/ProfileStats';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-50" onClick={handlePageClick}>
      <div className="container mx-auto px-4 py-2 max-w-full min-h-screen md:min-h-0 overflow-y-auto">
        {/* כפתור חזרה לדף הבית */}
        <button 
          onClick={() => navigate('/')}
          className="fixed top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          aria-label="חזור לדף הבית"
        >
          <Home className="w-6 h-6 text-gray-600" />
        </button>

        <div className="max-w-screen-md mx-auto space-y-6">
          <ProfileHeader user={user} />
          
          {isEditing ? (
            <div className="relative">
              {/* כפתור ביטול */}
              <button 
                onClick={() => setIsEditing(false)}
                className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
              >
                <XIcon className="w-5 h-5" />
              </button>
              <div onClick={(e) => e.stopPropagation()}>
                <ProfileEditForm user={user} onSave={() => setIsEditing(false)} onCancel={() => setIsEditing(false)} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit className="w-5 h-5 mr-2" />
                <span>ערוך פרופיל</span>
              </button>
              
              <button 
                onClick={() => navigate('/products/add')}
                className="flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                <span>הוסף מוצר</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span>התנתק</span>
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