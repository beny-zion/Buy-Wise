/* needed */
import React, { useState, useRef } from 'react';
import { Upload, Edit2, Eye, Video, ArrowRight, Check, X } from 'lucide-react';

const MediaGallery = ({ media, activeMedia, onMediaChange, onCustomUpload }) => (
  <div className="absolute bottom-4 left-4 right-4">
    <div className="bg-black/70 backdrop-blur-sm p-3 rounded-xl">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {media.map((item, index) => (
          <button
            key={index}
            onClick={() => onMediaChange(item)}
            className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden 
                     border-2 transition-all hover:scale-105 ${
                       activeMedia.url === item.url
                         ? 'border-[#FFA066]'
                         : 'border-gray-400'
                     }`}
          >
            {item.type === 'image' ? (
              <img src={item.url} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
            )}
          </button>
        ))}
        
        <label className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden 
                       border-2 border-dashed border-gray-400 hover:border-[#FFA066] 
                       cursor-pointer transition-all hover:scale-105">
          <input
            type="file"
            accept="image/*"
            onChange={onCustomUpload}
            className="hidden"
          />
          <div className="w-full h-full flex items-center justify-center bg-black/30">
            <Upload className="w-6 h-6 text-white" />
          </div>
        </label>
      </div>
    </div>
  </div>
);

const ProductCardEditor = ({ productData, onSave, user }) => {
  const [activeTab, setActiveTab] = useState('edit');
  const [activeMedia, setActiveMedia] = useState({
    type: 'image',
    url: productData.images.main
  });
  
  const [editing, setEditing] = useState({
    title: false,
    recommendation: false
  });

  const [previewData, setPreviewData] = useState({
    title: productData.title,
    recommendation: productData.recommendation || '',
    displayMedia: productData.images.main
  });

  // Refs for holding temporary edit values
  const editRefs = useRef({
    title: null,
    recommendation: null
  });

  const allMedia = [
    // בדיקה שיש תמונה ראשית
    ...(productData.images?.main ? [{ type: 'image', url: productData.images.main }] : []),
    
    // בדיקה שיש מערך תמונות קטנות ורק אז מבצע map
    ...(Array.isArray(productData.images?.small) 
      ? productData.images.small.map(url => ({ type: 'image', url }))
      : []),
    
    // בדיקה שיש וידאו
    ...(productData.product_video_url ? [{ type: 'video', url: productData.product_video_url }] : [])
  ];

  const handleMediaChange = (media) => {
    setActiveMedia(media);
    setPreviewData(prev => ({
      ...prev,
      displayMedia: media.url
    }));
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleMediaChange({ type: 'image', url });
    }
  };

  const handleSaveField = (field) => {
    const value = editRefs.current[field]?.value;
    if (value !== undefined) {
      setPreviewData(prev => ({ ...prev, [field]: value }));
      setEditing(prev => ({ ...prev, [field]: false }));
    }
  };

  const EditField = ({ field, multiline = false }) => {
    const value = previewData[field];
    
    if (!editing[field]) {
      return (
        <div className="group relative">
          {multiline ? (
            <p className="text-gray-700 min-h-[24px]">{value || 'לחץ לעריכה...'}</p>
          ) : (
            <h3 className="text-xl font-medium text-gray-900">{value}</h3>
          )}
          <button
            onClick={() => setEditing(prev => ({ ...prev, [field]: true }))}
            className="absolute -right-8 top-1/2 -translate-y-1/2"
          >
            <Edit2 className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      );
    }

    return (
      <div className="relative">
        {multiline ? (
          <textarea
            ref={el => editRefs.current[field] = el}
            defaultValue={value}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FFA066] 
                     focus:border-transparent resize-none"
            rows={6}
            maxLength={1000}
            autoFocus
          />
        ) : (
          <input
            ref={el => editRefs.current[field] = el}
            defaultValue={value}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFA066] 
                     focus:border-transparent"
            autoFocus
          />
        )}
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex gap-1">
          <button
            onClick={() => handleSaveField(field)}
            className="p-1.5 bg-green-50 text-green-600 rounded-full 
                     hover:bg-green-100 transition-colors"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={() => setEditing(prev => ({ ...prev, [field]: false }))}
            className="p-1.5 bg-red-50 text-red-600 rounded-full 
                     hover:bg-red-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const EditSection = () => (
    <div className="w-full bg-white rounded-xl shadow-lg p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-900">עריכת המוצר</h2>
        <button
          onClick={() => setActiveTab('preview')}
          className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>

      {/* תצוגה ראשית */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
        {activeMedia.type === 'image' ? (
          <img
            src={activeMedia.url}
            alt={previewData.title}
            className="w-full h-full object-contain"
          />
        ) : (
          <video
            src={activeMedia.url}
            controls
            className="w-full h-full object-contain"
          />
        )}
        
        <MediaGallery
          media={allMedia}
          activeMedia={activeMedia}
          onMediaChange={handleMediaChange}
          onCustomUpload={handleCustomUpload}
        />
      </div>

      {/* טופס עריכה */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            שם המוצר
          </label>
          <EditField field="title" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ההמלצה שלך
          </label>
          <EditField field="recommendation" multiline />
          {editing.recommendation && (
            <p className="text-sm text-gray-500 mt-1">
              {1000 - (editRefs.current.recommendation?.value.length || 0)} תווים נותרו
            </p>
          )}
        </div>

        <button
          onClick={() => onSave(previewData)}
          className="w-full bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] text-white 
                   py-2.5 px-6 rounded-lg font-medium shadow-md hover:shadow-lg 
                   transition-all duration-200"
        >
          שמור מוצר
        </button>
      </div>
    </div>
  );

  const PreviewSection = () => (
    <div className="w-full">
      <div className="lg:sticky lg:top-6">
        <div className="flex items-center mb-4 lg:hidden">
          <button
            onClick={() => setActiveTab('edit')}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-medium text-gray-900 mx-auto">
            תצוגה מקדימה
          </h2>
        </div>
        
        <div className="relative w-full max-w-sm mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
          <div className="relative aspect-[3/4]">
            <img
              src={previewData.displayMedia}
              alt={previewData.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={user?.profileImage || '/default-avatar.png'}
                alt={user?.fullName}
                className="w-12 h-12 rounded-full border border-gray-200"
              />
              <div>
                <div className="font-medium text-gray-900">{user?.fullName}</div>
                <div className="text-sm text-gray-500">{user?.bio}</div>
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2">{previewData.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {previewData.recommendation}
            </p>

            <button className="w-full bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] text-white 
                            py-2.5 px-6 rounded-full font-medium shadow-md">
              לרכישה באלי אקספרס
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1800px] mx-auto p-4 lg:p-6" dir="rtl">
      {/* טאבים למובייל */}
      <div className="flex border-b mb-4 lg:hidden">
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'edit'
              ? 'border-[#FFA066] text-[#FFA066]'
              : 'border-transparent text-gray-500'
          }`}
        >
          עריכה
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'preview'
              ? 'border-[#FFA066] text-[#FFA066]'
              : 'border-transparent text-gray-500'
          }`}
        >
          תצוגה מקדימה
        </button>
      </div>
      
      <div className="lg:flex lg:gap-6 lg:items-start">
        <div className={`${activeTab === 'edit' ? 'block' : 'hidden lg:block'} lg:w-[500px] lg:flex-shrink-0`}>
          <EditSection />
        </div>
        <div className={`${activeTab === 'preview' ? 'block' : 'hidden lg:block'}  lg:w-[400px] lg:flex-shrink-0`}>
          <PreviewSection />
        </div>
      </div>
    </div>
  );
};

export default ProductCardEditor;
