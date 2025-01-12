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
    <div className="w-full max-w-screen-md mx-auto bg-white rounded-lg shadow mt-4 p-4 md:p-6">
   <form onSubmit={handleSubmit} className="space-y-4">
   <ImageUploader 
     currentImage={user.profileImage}
     setFormData={setFormData}
   />
        
        <div>
          <label className="block text-sm font-medium mb-1">שם מלא</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">אימייל</label>
          <input
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">...תספר קצת עליך</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'שומר...' : 'שמור שינויים'}
        </button>
      </form>
    </div>
  );
};

export default ProfileEditForm;