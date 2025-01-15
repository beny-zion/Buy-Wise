// src/components/profile/ProfileEditForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ImageUploader from '../common/ImageUploader';


const ProfileEditForm = ({ user, onSave }) => {
 const { updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
 const [formData, setFormData] = useState({
  fullName: user.fullName,
  email: user.email,
  bio: user.bio || '',
  social: user.social || {},
  profileImage: null
});

const handleSubmit = async (e) => {
 e.preventDefault();
 setLoading(true);
 try {
   const form = new FormData();
   form.append('email', formData.email);
   form.append('fullName', formData.fullName);
   form.append('bio', formData.bio);
   
   if (formData.profileImage) {
     form.append('profileImage', formData.profileImage);
   }
     
   await updateUserProfile(form);
   onSave();
 } catch (err) {
   console.error(err.message);
 } finally {
   setLoading(false);
 }
};

return (
  <div className="w-full max-w-screen-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      {/* Image Uploader */}
      <div className="flex justify-center">
        <ImageUploader 
          currentImage={user.profileImage}
          setFormData={setFormData}
        />
      </div>
      
      {/* Form Fields */}
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">שם מלא</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full px-4 py-2.5 bg-white/50 border border-gray-200 
                     rounded-xl focus:ring-2 focus:ring-[#FFA066] focus:border-[#FFA066]
                     placeholder-gray-400 transition-all duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">אימייל</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-2.5 bg-white/50 border border-gray-200 
                     rounded-xl focus:ring-2 focus:ring-[#FFA066] focus:border-[#FFA066]
                     placeholder-gray-400 transition-all duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ספר לנו קצת על עצמך...</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            className="w-full px-4 py-3 bg-white/50 border border-gray-200 
                     rounded-xl focus:ring-2 focus:ring-[#FFA066] focus:border-[#FFA066]
                     placeholder-gray-400 transition-all duration-200 min-h-[120px]"
            rows={4}
            placeholder="תן לאנשים להכיר אותך טוב יותר..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button 
          type="submit" 
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                   text-white font-medium rounded-xl shadow-md
                   hover:shadow-lg transform hover:-translate-y-0.5
                   transition-all duration-200 disabled:opacity-50
                   disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              שומר שינויים...
            </span>
          ) : 'שמור שינויים'}
        </button>
      </div>
    </form>
  </div>
);
};

export default ProfileEditForm;