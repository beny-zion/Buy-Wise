// src/pages/auth/RegisterPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import RegisterForm  from '../../components/auth/RegisterForm.jsx';

const RegisterPage = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">הרשמה</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          או{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            התחבר למערכת
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;