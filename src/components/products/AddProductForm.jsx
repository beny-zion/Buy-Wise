import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../services/api/products';
import CategorySelector from '../search/CategorySelector';

const AddProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    htmlCode: '',
    recommendation: '',
    categories: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCategoriesChange = (categories) => {
    setFormData(prev => ({
      ...prev,
      categories
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      // בדיקה שנבחרה לפחות קטגוריה אחת
      if (formData.categories.length === 0) {
        throw new Error('חובה לבחור לפחות קטגוריה אחת');
      }
  
      const productData = {
        htmlCode: formData.htmlCode,
        recommendation: formData.recommendation,
        mainCategory: formData.categories.map(cat => cat._id) // שולחים מערך של קטגוריות
      };
  
      const response = await createProduct(productData);
      console.log(response);
      navigate(`/products/${response.product._id}`);
    } catch (err) {
      setError(err.message || 'שגיאה בהוספת המוצר');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      <div>
        <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
          קטגוריות
        </label>
        <div className="mt-1">
          <CategorySelector
            selectedCategories={formData.categories}
            onChange={handleCategoriesChange}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          בחר לפחות קטגוריה אחת עבור המוצר
        </p>
      </div>

      <div>
        <label htmlFor="htmlCode" className="block text-sm font-medium text-gray-700">
          קוד HTML מאלי אקספרס
        </label>
        <div className="mt-1">
          <textarea
            id="htmlCode"
            name="htmlCode"
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.htmlCode}
            onChange={handleChange}
            placeholder='הדבק כאן את קוד ה-HTML מאלי אקספרס'
            required
            dir="ltr"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          העתק את קוד ה-HTML של המוצר מאלי אקספרס והדבק אותו כאן
        </p>
      </div>

      <div>
        <label htmlFor="recommendation" className="block text-sm font-medium text-gray-700">
          ההמלצה שלך על המוצר
        </label>
        <div className="mt-1">
          <textarea
            id="recommendation"
            name="recommendation"
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.recommendation}
            onChange={handleChange}
            placeholder='כתוב כאן למה אתה ממליץ על המוצר...'
            required
            maxLength={1000}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {1000 - formData.recommendation.length} תווים נותרו
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              מוסיף מוצר...
            </>
          ) : 'הוסף מוצר'}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;