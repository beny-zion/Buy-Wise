/* needed */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, Edit3, Eye, Video, Home, ChevronRight, Check, X, 
  Save, Image as ImageIcon, Type, Heart, Star, ShoppingCart,
  AlertCircle
} from 'lucide-react';
import { formatPrice, truncateText } from '../utils/formatters';

const MediaGallery = ({ media, activeMedia, onMediaChange, onCustomUpload }) => (
  <div className="absolute bottom-4 left-4 right-4">
    <div className="bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {media.map((item, index) => (
          <button
            key={index}
            onClick={() => onMediaChange(item)}
            className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden 
                     border-2 transition-all duration-300 hover:scale-105 ${
                       activeMedia.url === item.url
                         ? 'border-[#FFA066] shadow-lg shadow-[#FFA066]/30'
                         : 'border-white/20 hover:border-white/40'
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
        
        <label className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden 
                       border-2 border-dashed border-white/30 hover:border-[#FFA066] 
                       cursor-pointer transition-all duration-300 hover:scale-105 group">
          <input
            type="file"
            accept="image/*"
            onChange={onCustomUpload}
            className="hidden"
          />
          <div className="w-full h-full flex items-center justify-center bg-black/40 group-hover:bg-black/60">
            <Upload className="w-6 h-6 text-white group-hover:text-[#FFA066] transition-colors" />
          </div>
        </label>
      </div>
    </div>
  </div>
);

const ProductCardEditor = ({ productData, onSave, user }) => {
  const navigate = useNavigate();
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

  const [fieldErrors, setFieldErrors] = useState({});
  const editRefs = useRef({
    title: null,
    recommendation: null
  });

  const allMedia = [
    ...(productData.images?.main ? [{ type: 'image', url: productData.images.main }] : []),
    ...(Array.isArray(productData.images?.small) 
      ? productData.images.small.map(url => ({ type: 'image', url }))
      : []),
    ...(productData.product_video_url ? [{ type: 'video', url: productData.product_video_url }] : [])
  ];

  const hasOpenFields = editing.title || editing.recommendation;

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
    
    if (value === undefined) {
      setFieldErrors(prev => ({ ...prev, [field]: 'שגיאה בקריאת הערך' }));
      return;
    }

    let isValid = true;
    let errorMessage = '';

    if (field === 'recommendation') {
      if (value.trim().length < 5) {
        isValid = false;
        errorMessage = 'המלצה חייבת להכיל לפחות 5 תווים';
      } else if (value.length > 1000) {
        isValid = false;
        errorMessage = 'המלצה לא יכולה להכיל יותר מ-1000 תווים';
      }
    } else if (field === 'title') {
      if (value.trim().length < 3) {
        isValid = false;
        errorMessage = 'כותרת חייבת להכיל לפחות 3 תווים';
      } else if (value.length > 200) {
        isValid = false;
        errorMessage = 'כותרת לא יכולה להכיל יותר מ-200 תווים';
      }
    }

    if (!isValid) {
      setFieldErrors(prev => ({ ...prev, [field]: errorMessage }));
      return;
    }

    setFieldErrors(prev => ({ ...prev, [field]: null }));
    setPreviewData(prev => ({ ...prev, [field]: value }));
    setEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleCancelEdit = (field) => {
    setFieldErrors(prev => ({ ...prev, [field]: null }));
    setEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleFinalSave = () => {
    if (hasOpenFields) {
      return; // הכפתור יהיה מנוטרל
    }

    if (previewData.recommendation.trim().length < 5) {
      alert('המלצה חייבת להכיל לפחות 5 תווים');
      return;
    }

    if (previewData.title.trim().length < 3) {
      alert('כותרת חייבת להכיל לפחות 3 תווים');
      return;
    }

    onSave(previewData);
  };

  const EditField = ({ field, multiline = false, icon: Icon, label }) => {
    const value = previewData[field];
    const hasError = fieldErrors[field];
    const isEditing = editing[field];
    
    if (!isEditing) {
      return (
        <div className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-gray-200 
                      hover:border-[#FFA066] transition-all duration-300">
          <div className="flex items-start gap-2 sm:gap-3">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 block">{label}</label>
              {multiline ? (
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed min-h-[40px] sm:min-h-[60px] break-words">
                  {value || 'לחץ לעריכה...'}
                </p>
              ) : (
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                  {value || 'לחץ לעריכה...'}
                </h3>
              )}
            </div>
            <button
              onClick={() => setEditing(prev => ({ ...prev, [field]: true }))}
              className="opacity-0 group-hover:opacity-100 sm:opacity-100 p-1.5 sm:p-2 bg-[#FFA066]/10 text-[#FFA066] rounded-lg sm:rounded-xl
                       hover:bg-[#FFA066]/20 transition-all duration-300 flex-shrink-0"
            >
              <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border-2 border-[#FFA066] 
                    shadow-lg shadow-[#FFA066]/10">
        <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFA066] mt-1 flex-shrink-0" />
          <label className="text-xs sm:text-sm font-medium text-[#FFA066]">{label}</label>
        </div>
        
        {multiline ? (
          <textarea
            ref={el => editRefs.current[field] = el}
            defaultValue={value}
            className={`w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 
                     focus:ring-4 focus:ring-[#FFA066]/20 focus:border-[#FFA066] transition-all duration-300 
                     resize-none bg-white/80 min-h-[120px] sm:min-h-[140px] ${
                       hasError ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                     }`}
            maxLength={field === 'recommendation' ? 1000 : 500}
            placeholder={`הכנס ${label.toLowerCase()}...`}
            autoFocus
          />
        ) : (
          <input
            ref={el => editRefs.current[field] = el}
            defaultValue={value}
            className={`w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 
                     focus:ring-4 focus:ring-[#FFA066]/20 focus:border-[#FFA066] transition-all duration-300 bg-white/80 ${
                       hasError ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                     }`}
            maxLength={field === 'title' ? 200 : 500}
            placeholder={`הכנס ${label.toLowerCase()}...`}
            autoFocus
          />
        )}
        
        {hasError && (
          <div className="flex items-start gap-2 text-red-600 text-xs sm:text-sm mt-2">
            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
            <span className="break-words">{hasError}</span>
          </div>
        )}
        
        {field === 'recommendation' && (
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            {1000 - (editRefs.current.recommendation?.value.length || 0)} תווים נותרו
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
          <button
            onClick={() => handleSaveField(field)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-green-500 text-white rounded-lg sm:rounded-xl
                     hover:bg-green-600 transition-all duration-300 font-medium text-sm sm:text-base order-1 sm:order-none"
          >
            <Check className="w-4 h-4" />
            <span>שמור</span>
          </button>
          <button
            onClick={() => handleCancelEdit(field)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-gray-500 text-white rounded-lg sm:rounded-xl
                     hover:bg-gray-600 transition-all duration-300 font-medium text-sm sm:text-base order-2 sm:order-none"
          >
            <X className="w-4 h-4" />
            <span>ביטול</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50" dir="rtl">
      {/* רקע דקורטיבי */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-[#FFA066]/5 rounded-full blur-3xl" />
        <div className="absolute -left-1/4 top-1/3 w-1/2 h-1/2 bg-[#FF6B6B]/5 rounded-full blur-3xl" />
      </div>

      {/* כפתורי ניווט */}
      <div className="fixed top-4 right-4 flex gap-2 z-50">
        <button 
          onClick={() => navigate('/')}
          className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
                   hover:shadow-lg hover:scale-105 transition-all duration-200"
          title="דף הבית"
        >
          <Home className="w-5 h-5 text-[#FFA066]" />
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
                   hover:shadow-lg hover:scale-105 transition-all duration-200"
          title="חזור אחורה"
        >
          <ChevronRight className="w-5 h-5 text-[#FFA066]" />
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative">
        {/* כותרת */}
        <div className="text-center mb-8 pt-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                        bg-clip-text text-transparent mb-2">
            עיצוב כרטיס המוצר
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            ערוך את פרטי המוצר וראה איך הוא יראה בפועל
          </p>
        </div>

        {/* פס התקדמות */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                ✓
              </div>
              <span className="text-green-600 font-medium text-xs sm:text-sm">הוספת קישור</span>
            </div>
            <div className="w-8 sm:w-16 h-1 bg-[#FFA066] rounded-full"></div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#FFA066] rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                2
              </div>
              <span className="text-[#FFA066] font-medium text-xs sm:text-sm">עיצוב כרטיס</span>
            </div>
          </div>
        </div>

        {/* טאבים למובייל */}
        <div className="lg:hidden flex bg-white/80 backdrop-blur-sm rounded-2xl p-1 mb-6 border border-white/20">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-3 px-4 text-sm font-medium rounded-xl transition-all duration-300 ${
              activeTab === 'edit'
                ? 'bg-[#FFA066] text-white shadow-lg'
                : 'text-gray-600 hover:text-[#FFA066]'
            }`}
          >
            <Edit3 className="w-4 h-4 mx-auto mb-1" />
            עריכה
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 px-4 text-sm font-medium rounded-xl transition-all duration-300 ${
              activeTab === 'preview'
                ? 'bg-[#FFA066] text-white shadow-lg'
                : 'text-gray-600 hover:text-[#FFA066]'
            }`}
          >
            <Eye className="w-4 h-4 mx-auto mb-1" />
            תצוגה
          </button>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6 xl:gap-8 items-start">
          {/* עמודת עריכה */}
          <div className={`${activeTab === 'edit' ? 'block' : 'hidden lg:block'} space-y-6`}>
            {/* תצוגת מדיה */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="w-5 h-5 text-[#FFA066]" />
                  <h3 className="text-lg font-semibold text-gray-800">תמונות ווידאו</h3>
                </div>
                
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
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
              </div>
            </div>

            {/* עריכת פרטים */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-4 sm:p-6 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-5 h-5 text-[#FFA066]" />
                <h3 className="text-lg font-semibold text-gray-800">פרטי המוצר</h3>
              </div>
              
              <EditField 
                field="title" 
                icon={Type} 
                label="שם המוצר" 
              />
              
              <EditField 
                field="recommendation" 
                multiline 
                icon={Heart} 
                label="ההמלצה שלך" 
              />
            </div>

            {/* כפתור שמירה */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-4 sm:p-6">
              {hasOpenFields && (
                <div className="flex items-center gap-2 text-orange-600 bg-orange-50 p-3 rounded-2xl mb-4 border border-orange-200">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">יש לשמור את השדות הפתוחים לפני השמירה הסופית</span>
                </div>
              )}
              
              <button
                onClick={handleFinalSave}
                disabled={hasOpenFields}
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 
                         flex items-center justify-center gap-3 ${
                  hasOpenFields
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <Save className="w-5 h-5" />
                <span className="text-sm sm:text-lg">
                  {hasOpenFields ? 'שמור קודם את השדות הפתוחים' : 'שמור מוצר וסיים'}
                </span>
              </button>
            </div>
          </div>

          {/* עמודת תצוגה */}
          <div className={`${activeTab === 'preview' ? 'block' : 'hidden lg:block'} lg:sticky lg:top-8`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-6">
                <Eye className="w-5 h-5 text-[#FFA066]" />
                <h3 className="text-lg font-semibold text-gray-800">תצוגה מקדימה</h3>
              </div>
              
              {/* כרטיס מוצר מעודכן - ללא מחיר */}
              <div className="max-w-sm mx-auto bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                {/* תמונת מוצר */}
                <div className="relative aspect-[4/3]">
                  <img
                    src={previewData.displayMedia}
                    alt={previewData.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 space-y-4">
                  {/* פרטי מוכר */}
                  <div className="flex items-center gap-3">
                    <img
                      src={user?.profileImage || '/default-avatar.png'}
                      alt={user?.fullName}
                      className="w-10 h-10 rounded-full border-2 border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm truncate">{user?.fullName}</div>
                      <div className="text-xs text-gray-500 truncate">{user?.bio || 'מוכר פעיל'}</div>
                    </div>
                  </div>

                  {/* המלצה במקום כותרת */}
                  <p className="font-medium text-gray-900 text-base leading-tight line-clamp-3 min-h-[60px]">
                    {truncateText(previewData.recommendation || 'ההמלצה שלך תופיע כאן...', 80)}
                  </p>

                  {/* דירוג בלבד - ללא מחיר */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-600">4.8</span>
                    </div>
                    {/* // 🔧 מחיר הוסר זמנית מהתצוגה המקדימה */}
                    {/* <div>
                      <div className="font-semibold text-green-600">
                        {formatPrice(productData.price?.current || 19.99)}
                      </div>
                      <div className="text-xs text-gray-500">
                        מחיר משוער
                      </div>
                    </div> */}
                  </div>

                  {/* כפתור רכישה */}
                  <button className="w-full bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] text-white 
                                  py-3 px-4 rounded-xl font-semibold text-sm
                                  hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>לרכישה באלי אקספרס</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardEditor;