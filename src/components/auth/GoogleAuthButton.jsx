// src/components/auth/GoogleAuthButton.jsx
import React from 'react';

const GoogleAuthButton = () => {
  // 🌍 שימוש ב-Environment Variables
  const apiUrl =  'product-pick-server.onrender.com';
  
  const handleGoogleAuth = () => {
    window.location.href = `${apiUrl}/user/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className="w-full flex justify-center items-center gap-3 px-6 py-3.5
               border-2 border-gray-200 rounded-xl shadow-sm
               text-gray-700 font-medium bg-white
               hover:bg-gray-50 transition-all duration-200
               hover:shadow-md transform hover:-translate-y-0.5"
    >
      <img
        className="h-6 w-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google logo"
      />
      <span>המשך עם Google</span>
    </button>
  );
};

export default GoogleAuthButton;
