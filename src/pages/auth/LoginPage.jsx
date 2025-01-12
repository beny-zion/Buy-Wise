// src/pages/auth/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import  LoginForm  from '../../components/auth/LoginForm';

const LoginPage = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">התחברות</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          או{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            הירשם למערכת
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;