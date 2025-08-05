/* needed */
// src/pages/auth/LoginPage.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import logoSvg from '../../assets/logo/new.svg';
import GoogleAuthButton from '../../components/auth/GoogleAuthButton';

const LoginPage = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-[#FFA066] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-50 
                    flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* רקע דקורטיבי */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-[#FFA066]/5 rounded-full blur-3xl" />
        <div className="absolute -left-1/4 top-1/3 w-1/2 h-1/2 bg-[#FF6B6B]/5 rounded-full blur-3xl" />
      </div>
      
      {/* הוספת הלוגו */}
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <img 
          src={logoSvg}
          alt="BuyWise"
          className="h-24 w-auto mx-auto"
        />
      </div>

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-4xl font-bold bg-gradient-to-r 
                      from-[#FFA066] to-[#FF6B6B] bg-clip-text text-transparent">
          התחברות
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <p className="text-gray-600">
              התחבר באמצעות חשבון Google שלך
            </p>
          </div>
          
          <GoogleAuthButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;