/* needed */

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Home, ChevronRight, Link, MessageCircle, Sparkles } from 'lucide-react';
import axios from 'axios';
import ProductCardEditor from './ProductCardEditor';
import { createFullProduct } from '../services/api/fullProducts';
import { useAuth } from '../contexts/AuthContext';

const API_URL = `${import.meta.env.VITE_API_URL}/api/aliexpress/products/validate`;

const ProductForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    url: '',
    recommendation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [productData, setProductData] = useState(null);
  const [success, setSuccess] = useState('');
  const isSaving = useRef(false);
  
  const validateForm = () => {
    if (!formData.url.trim()) {
      setError('יש להזין קישור למוצר');
      return false;
    }
    
    if (!formData.recommendation.trim()) {
      setError('יש להזין המלצה');
      return false;
    }
    
    if (formData.recommendation.trim().length < 5) {
      setError('המלצה חייבת להכיל לפחות 5 תווים');
      return false;
    }
    
    if (formData.recommendation.length > 1000) {
      setError('המלצה לא יכולה להכיל יותר מ-1000 תווים');
      return false;
    }
    
    try {
      const url = new URL(formData.url);
      if (!url.hostname.includes('aliexpress')) {
        setError('הקישור חייב להיות של AliExpress');
        return false;
      }
    } catch {
      setError('קישור לא תקין');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const url = { url: formData.url };
      const response = await axios.post(API_URL, url, {
        withCredentials: true
      });
      
      setProductData({
        ...response.data.data,
        recommendation: formData.recommendation
      });
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'שגיאה בלתי צפויה. אנא נסה שנית');
    } finally {
      setLoading(false);
    }
  };

  const handleEditorSave = async (editedData) => {
    if (isSaving.current) {
      console.log('כבר שומר...');
      return;
    }
    
    try {
      isSaving.current = true;
      setLoading(true);
      setError('');
      setSuccess('');
      
      const dataToSend = {
        productData: {
          ...productData,
          title: editedData.title,
          displayMedia: editedData.displayMedia,
          isAffiliate: productData.isAffiliate
        },
        recommendation: editedData.recommendation
      };
      
      console.log('🚀 שולח מוצר לשמירה...');
      const response = await createFullProduct(dataToSend);
      
      if (response.success && response.product) {
        console.log('✅ מוצר נשמר בהצלחה:', response.product._id);
        
        setSuccess('המוצר נשמר בהצלחה! מעביר לדף המוצר...');
        
        setTimeout(() => {
          console.log('🎯 מעביר לדף המוצר:', `/product/${response.product._id}`);
          navigate(`/product/${response.product._id}`, { replace: true });
        }, 1500);
        
      } else {
        throw new Error(response.message || 'שגיאה בלתי מזוהה');
      }
    } catch (error) {
      console.error('❌ Error saving product:', error);
      setError(error.message || 'שגיאה בשמירת המוצר');
      isSaving.current = false;
    } finally {
      setLoading(false);
    }
  };

  // טעינה/שמירה אינדיקטור
  if (loading && productData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
        {/* רקע דקורטיבי */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-[#FFA066]/5 rounded-full blur-3xl" />
          <div className="absolute -left-1/4 top-1/3 w-1/2 h-1/2 bg-[#FF6B6B]/5 rounded-full blur-3xl" />
        </div>
        
        <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20 text-center max-w-md w-full relative">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            {success ? 'מוכן!' : 'שומר מוצר...'}
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            {success ? 'מעביר לדף המוצר' : 'אנא המתן רגע'}
          </p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] h-2 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

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
        {/* כותרת ראשית */}
        <div className="text-center mb-8 sm:mb-12 pt-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                        bg-clip-text text-transparent mb-2 sm:mb-4">
            הוספת מוצר חדש
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            הוסף מוצר מאלי אקספרס והשתף את ההמלצה שלך עם הקהילה
          </p>
        </div>

        {productData ? (
          <ProductCardEditor
            productData={productData}
            onSave={handleEditorSave}
            user={user}
          />
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* פס התקדמות */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#FFA066] rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                    1
                  </div>
                  <span className="text-[#FFA066] font-medium text-xs sm:text-sm">הוספת קישור</span>
                </div>
                <div className="w-8 sm:w-16 h-1 bg-gray-200 rounded-full"></div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs sm:text-sm font-semibold">
                    2
                  </div>
                  <span className="text-gray-500 font-medium text-xs sm:text-sm">עיצוב כרטיס</span>
                </div>
              </div>
            </div>

            {/* טופס הוספת מוצר */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 sm:space-y-8">
                
                {/* קישור מוצר */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800">
                    <Link className="w-5 h-5 text-[#FFA066]" />
                    קישור למוצר מאלי אקספרס
                  </label>
                  <p className="text-sm text-gray-600 mr-7">
                    העתק והדבק את הקישור של המוצר שברצונך להמליץ עליו
                  </p>
                  <div className="relative">
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        url: e.target.value
                      }))}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-2xl border-2 border-gray-200 
                               focus:border-[#FFA066] focus:ring-4 focus:ring-[#FFA066]/20 
                               transition-all duration-300 bg-white/50 backdrop-blur-sm
                               placeholder:text-gray-400"
                      placeholder="https://aliexpress.com/item/..."
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* המלצה */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800">
                    <MessageCircle className="w-5 h-5 text-[#FF6B6B]" />
                    ההמלצה שלך
                  </label>
                  <p className="text-sm text-gray-600 mr-7">
                    ספר למה אתה ממליץ על המוצר הזה (לפחות 5 תווים)
                  </p>
                  <div className="relative">
                    <textarea
                      value={formData.recommendation}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        recommendation: e.target.value
                      }))}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-2xl border-2 border-gray-200 
                               focus:border-[#FF6B6B] focus:ring-4 focus:ring-[#FF6B6B]/20 
                               transition-all duration-300 bg-white/50 backdrop-blur-sm
                               placeholder:text-gray-400 resize-none"
                      rows={4}
                      maxLength={1000}
                      placeholder="למה אתה ממליץ על המוצר הזה? מה הנסיון שלך איתו?"
                      required
                      disabled={loading}
                    />
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 text-sm text-gray-500 gap-2">
                      <span className={`${formData.recommendation.trim().length < 5 ? 'text-orange-500' : 'text-green-600'}`}>
                        {formData.recommendation.trim().length < 5 
                          ? `נדרשים עוד ${5 - formData.recommendation.trim().length} תווים`
                          : '✓ אורך מתאים'
                        }
                      </span>
                      <span>{1000 - formData.recommendation.length} תווים נותרו</span>
                    </div>
                  </div>
                </div>

                {/* כפתור שליחה */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#FFA066] to-[#FF6B6B]
                           text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl text-base sm:text-lg
                           hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
                           transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100
                           disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>מביא נתונים...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>המשך לעיצוב הכרטיס</span>
                    </>
                  )}
                </button>
              </form>

              {/* הודעות */}
              {success && (
                <div className="mx-6 sm:mx-8 mb-6 sm:mb-8 flex items-start gap-3 text-green-700 bg-green-50 p-4 rounded-2xl border border-green-200">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="font-medium text-sm sm:text-base">{success}</p>
                </div>
              )}

              {error && (
                <div className="mx-6 sm:mx-8 mb-6 sm:mb-8 flex items-start gap-3 text-red-700 bg-red-50 p-4 rounded-2xl border border-red-200">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="font-medium text-sm sm:text-base">{error}</p>
                </div>
              )}
            </div>

            {/* הסבר תהליך */}
            <div className="mt-6 sm:mt-8 text-center">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-white/60 backdrop-blur-sm 
                            px-3 sm:px-4 py-2 rounded-full border border-white/30">
                <Sparkles className="w-4 h-4" />
                <span>לאחר הוספת הקישור תוכל לעצב את כרטיס המוצר</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductForm;