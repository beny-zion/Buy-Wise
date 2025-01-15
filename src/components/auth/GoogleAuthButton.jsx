// src/components/auth/GoogleAuthButton.jsx
import React from 'react';

const GoogleAuthButton = ({ text = 'התחבר עם Google' }) => {
  const handleGoogleAuth = () => {
    // Redirect to Google auth endpoint
    window.location.href = `${process.env.REACT_APP_API_URL}/user/google`;
  };

  return (
    <div className="mt-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white/80 text-gray-500 backdrop-blur-sm">
            או
          </span>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full flex justify-center items-center gap-3 px-6 py-3
                   border-2 border-gray-200 rounded-xl shadow-sm
                   text-sm font-medium text-gray-700 bg-white/80
                   hover:bg-gray-50 transition-all duration-200
                   backdrop-blur-sm"
        >
          <img
            className="h-5 w-5"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
          />
          {text}
        </button>
      </div>
    </div>
  );
};

export default GoogleAuthButton;