/* needed */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Loader, Home, ChevronRight } from 'lucide-react';
import axios from 'axios';
import ProductCardEditor from './ProductCardEditor';
import { createFullProduct } from '../services/api/fullProducts';
import { useAuth } from '../contexts/AuthContext';
import { useProductViewer } from '../contexts/ProductViewerContext'; // הוספת ייבוא חדש

const API_URL = "http://localhost:3333/api/aliexpress/products/validate";

const ProductForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { navigateToSpecificProduct } = useProductViewer(); // שימוש בהוק לגישה לקונטקסט
  
  const [formData, setFormData] = useState({
    url: '',
    recommendation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [productData, setProductData] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const url = { url: formData.url };
      const response = await axios.post(API_URL, url, {
        withCredentials: true
      });
      
      // הוספת ההמלצה לנתוני המוצר
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
    try {
      setLoading(true);
      
      // יצירת אובייקט הנתונים לשליחה בפורמט שמתאים ל-API
      const dataToSend = {
        productData: {
          ...productData,
          title: editedData.title,
          displayMedia: editedData.displayMedia,
          isAffiliate: productData.isAffiliate
        },
        recommendation: editedData.recommendation
      };
      
      const response = await createFullProduct(dataToSend);
      
      if (response.success && response.product) {
        // שימוש בפונקציה החדשה מהקונטקסט במקום ניווט רגיל
        navigateToSpecificProduct(response.product._id , true);
      } else {
        throw new Error(response.message || 'שגיאה בלתי מזוהה');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setError(error.message || 'שגיאה בשמירת המוצר');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-white to-gray-50 py-6">
      {/* תוכן קיים - לא שונה */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-[#FFA066]/5 rounded-full blur-3xl" />
        <div className="absolute -left-1/4 top-1/3 w-1/2 h-1/2 bg-[#FF6B6B]/5 rounded-full blur-3xl" />
      </div>
      
      <div className="fixed top-4 right-4 z-10 flex gap-2">
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
      
      <div className="max-w-4xl mx-auto relative z-10 px-4">
        <h1 className="text-center text-3xl font-bold mb-8 bg-gradient-to-r 
                      from-[#FFA066] to-[#FF6B6B] bg-clip-text text-transparent">
          הוספת מוצר חדש
        </h1>
        
        {productData ? (
          <ProductCardEditor
            productData={productData}
            onSave={handleEditorSave}
            user={user}
          />
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  קישור למוצר מאלי אקספרס
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    url: e.target.value
                  }))}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-[#FFA066] focus:border-transparent"
                  placeholder="הדבק כאן את הקישור..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  המלצה על המוצר
                </label>
                <textarea
                  value={formData.recommendation}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    recommendation: e.target.value
                  }))}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-[#FFA066] focus:border-transparent"
                  rows={4}
                  maxLength={1000}
                  placeholder="כתוב כאן את ההמלצה שלך..."
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {1000 - formData.recommendation.length} תווים נותרו
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                         text-white font-medium py-2.5 px-4 rounded-lg
                         hover:opacity-90 transition-all duration-200 disabled:opacity-50
                         flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    <span>מביא נתונים...</span>
                  </>
                ) : 'המשך לעיצוב הכרטיס'}
              </button>
            </form>

            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-lg" dir="rtl">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductForm;

