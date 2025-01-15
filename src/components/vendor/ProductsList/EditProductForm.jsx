// components/vendor/products/EditProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProduct, deleteProduct  } from '../../../services/api/products';
import CategorySelector from '../../search/CategorySelector';

const EditProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    recommendation: product.recommendation,
    mainCategory: product.mainCategory || []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const dataProduct = await updateProduct(product._id, formData);
      console.log("dataProduct", dataProduct);
      onSave?.();
      navigate(`/vendor/products/${product._id}`);
    } catch (err) {
      setError(err.message || 'שגיאה בעדכון המוצר');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק את המוצר?')) return;
    try {
      await deleteProduct(product._id);
      navigate('/vendor/products');
    } catch (err) {
      setError(err.message || 'שגיאה במחיקת המוצר');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
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
          rows={4}
          className="w-full px-3 py-2 border rounded-md"
          maxLength={1000}
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          {1000 - formData.recommendation.length} תווים נותרו
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          קטגוריות
        </label>
        <CategorySelector
          selectedCategories={formData.mainCategory}
          onChange={(categories) => setFormData(prev => ({
            ...prev,
            mainCategory: categories
          }))}
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'שומר...' : 'שמור שינויים'}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          מחק מוצר
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
        >
          ביטול
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;