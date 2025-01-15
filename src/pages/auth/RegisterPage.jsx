// src/pages/auth/RegisterPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import RegisterForm  from '../../components/auth/RegisterForm.jsx';
import logoSvg from '../../assets/logo/new.svg';

const RegisterPage = () => {
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
          הרשמה
        </h2>
        <p className="mt-3 text-center text-sm text-gray-600">
          או{' '}
          <Link 
            to="/login" 
            className="font-medium text-[#FFA066] hover:text-[#FF6B6B] 
                     transition-colors duration-200"
          >
            התחבר למערכת
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;