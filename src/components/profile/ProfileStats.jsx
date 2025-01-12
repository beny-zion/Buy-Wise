// src/components/profile/ProfileStats.jsx
import React from 'react';

const ProfileStats = ({ user }) => (
    <div className="w-full max-w-screen-md mx-auto bg-white rounded-lg shadow mt-6 p-4 md:p-6">
    <h2 className="text-xl font-bold mb-4 text-center md:text-right">סטטיסטיקות</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <div>
        <div className="text-2xl font-bold">
          {user.isVendor ? user.productsLimit : '-'}
        </div>
        <div className="text-sm text-gray-600">מוצרים</div>
      </div>
      <div>
        <div className="text-2xl font-bold">
          {new Date(user.createdAt).toLocaleDateString()}
        </div>
        <div className="text-sm text-gray-600">הצטרף בתאריך</div>
      </div>
      <div>
        <div className="text-2xl font-bold">
          {user.isVendor ? 'מוכר' : 'משתמש'}
        </div>
        <div className="text-sm text-gray-600">סוג חשבון</div>
      </div>
    </div>
  </div>
);

export default ProfileStats;