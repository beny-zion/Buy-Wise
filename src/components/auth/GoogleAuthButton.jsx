// src/components/auth/GoogleAuthButton.jsx
import React from 'react';

const GoogleAuthButton = ({ text = 'התחבר עם Google' }) => {
  const handleGoogleAuth = () => {
    // Redirect to Google auth endpoint
    window.location.href = `${process.env.REACT_APP_API_URL}/user/google`;
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            או
          </span>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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