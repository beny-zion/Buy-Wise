import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { User } from 'lucide-react';

const ProfileCircle = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={handleClick}
        className="relative w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden
                   border border-gray-200 hover:border-blue-500 transition-colors"
      >
        {user?.profileImage ? (
          <img 
            src={user.profileImage} 
            alt="פרופיל"
            className="w-full h-full object-cover" 
          />
        ) : (
          <User className="w-6 h-6 text-gray-600" />
        )}
      </button>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                      bg-gray-900 text-white text-sm py-1 px-2 rounded whitespace-nowrap">
          {user ? 'אזור אישי' : 'התחברות'}
        </div>
      )}
    </div>
  );
};

export default ProfileCircle;