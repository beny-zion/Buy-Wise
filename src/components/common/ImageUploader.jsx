import React, {useState} from 'react';
import { Camera } from 'lucide-react';

const ImageUploader = ({ currentImage, setFormData }) => {
 
  const [preview, setPreview] = useState(currentImage);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
 
    // עדכון התמונה בפורם דאטא
    setFormData(prev => ({
      ...prev,
      profileImage: file
    }));
 
    // יצירת URL לתצוגה מקדימה
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };
 

 return (
   <div className="relative w-32 h-32 mx-auto mb-4">
     <img 
       src={preview || currentImage || '/api/placeholder/128/128'} 
       alt="Profile"
       className="w-full h-full rounded-full object-cover"
     />
     <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow cursor-pointer">
       <Camera size={20} />
       <input 
         type="file" 
         onChange={handleImageChange}
         className="hidden"
         accept="image/*"
         name="profileImage"
       />
     </label>
   </div>

 );
};

export default ImageUploader;
