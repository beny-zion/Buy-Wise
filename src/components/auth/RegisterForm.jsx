import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorAlert } from '../../components/common/ErrorAlert';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const fileInputRef = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      const formData = new FormData();
      const profileImage = fileInputRef.current?.files[0];
      
      // להשתמש בערכים מהטופס במקום משתנים לא מוגדרים
      formData.append('email', e.target.email.value);
      formData.append('password', e.target.password.value);
      formData.append('fullName', e.target.fullName.value);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'שגיאה בהרשמה');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-80vh bg-gray-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8">


      <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <ErrorAlert
              message={error}
              onClose={() => setError('')}
            />
          )}

      <form className="space-y-6" onSubmit={handleSubmit} dir="rtl">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                שם מלא
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="mt-2 block w-full px-4 py-2.5 bg-white/50 border border-gray-200 
                  rounded-xl focus:ring-2 focus:ring-[#FFA066] focus:border-[#FFA066]
                  placeholder-gray-400 transition-all duration-200"                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                כתובת אימייל
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 block w-full px-4 py-2.5 bg-white/50 border border-gray-200 
                  rounded-xl focus:ring-2 focus:ring-[#FFA066] focus:border-[#FFA066]
                  placeholder-gray-400 transition-all duration-200"                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                סיסמה
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="mt-2 block w-full px-4 py-2.5 bg-white/50 border border-gray-200 
                  rounded-xl focus:ring-2 focus:ring-[#FFA066] focus:border-[#FFA066]
                  placeholder-gray-400 transition-all duration-200"                />
              </div>
            </div>

            <div>
              <label
                htmlFor="profileImage"
                className="block text-sm font-medium text-gray-700"
              >
                תמונת פרופיל
              </label>
              <div className="mt-1">
                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="mt-2 block w-full px-4 py-2.5 bg-white/50 border border-gray-200 
                  rounded-xl focus:ring-2 focus:ring-[#FFA066] focus:border-[#FFA066]
                  placeholder-gray-400 transition-all duration-200"                />
              </div>
            </div>

            <div>
            <button
      type="submit"
      disabled={isLoading}
      className="w-full flex justify-center py-3 px-6
               bg-gradient-to-r from-[#FFA066] to-[#FF6B6B]
               text-white font-medium rounded-xl shadow-md
               hover:shadow-lg transform hover:-translate-y-0.5
               transition-all duration-200 disabled:opacity-50"
    >
      {isLoading ? <LoadingSpinner /> : 'הרשם'}
    </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  או הרשם עם
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => window.location.href = '/api/auth/google'}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <img
                  className="h-5 w-5 mr-2"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                />
                <span>Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;