// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GoogleAuthButton from './GoogleAuthButton';
import { ErrorAlert } from '../common/ErrorAlert';
import { LoadingSpinner } from '../common/LoadingSpinner';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const logi = await login(formData);
      console.log(logi)
      navigate('/');
    } catch (err) {
      setError(err.message || 'שגיאה בהתחברות');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white/80 backdrop-blur-sm py-8 px-6 sm:px-10">
        {error && (
          <ErrorAlert 
            message={error} 
            onClose={() => setError('')}
          />
        )}
  
        <form className="space-y-6" onSubmit={handleSubmit} dir="rtl">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              כתובת אימייל
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2.5 bg-white/50 border border-gray-200 
                       rounded-xl focus:ring-2 focus:ring-[#FFA066] focus:border-[#FFA066]
                       placeholder-gray-400 transition-all duration-200"
            />
          </div>
  
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              סיסמה
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2.5 bg-white/50 border border-gray-200 
                       rounded-xl focus:ring-2 focus:ring-[#FFA066] focus:border-[#FFA066]
                       placeholder-gray-400 transition-all duration-200"
            />
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
              {isLoading ? <LoadingSpinner /> : 'התחבר'}
            </button>
          </div>
        </form>
  
        <GoogleAuthButton text="התחבר עם Google" />
      </div>
    </div>
  );
};

export default LoginForm;