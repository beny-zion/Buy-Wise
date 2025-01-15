// pages/vendor/EditProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { getProduct}  from '../../services/api/products';
import EditProductForm from '../../components/vendor/ProductsList/EditProductForm';

const EditProductPage = () => {
  const [productt, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await getProduct(id);
        console.log("response", response.product);
        setProduct(response.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-[#FFA066] border-t-transparent rounded-full" />
      </div>
    );
  }
 
  if (error || !productt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'המוצר לא נמצא'}</p>
          <button
            onClick={() => navigate('/vendor/products')}
            className="text-[#FFA066] hover:text-[#FF6B6B] transition-colors"
          >
            חזרה לרשימת המוצרים
          </button>
        </div>
      </div>
    );
  }
 
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-50 py-12">
      {/* רקע דקורטיבי */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-[#FFA066]/5 rounded-full blur-3xl" />
        <div className="absolute -left-1/4 top-1/3 w-1/2 h-1/2 bg-[#FF6B6B]/5 rounded-full blur-3xl" />
      </div>
 
      {/* כפתורי ניווט */}
      <div className="fixed top-4 right-4 flex gap-2 z-10">
        <button 
          onClick={() => navigate('/')}
          className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
                   hover:shadow-lg hover:scale-105 transition-all duration-200"
          title="דף הבית"
        >
          <Home className="w-5 h-5 text-[#FFA066]" />
        </button>
        <button 
          onClick={() => navigate('/vendor/products')}
          className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
                   hover:shadow-lg hover:scale-105 transition-all duration-200"
          title="חזרה לרשימת המוצרים"
        >
          <ChevronRight className="w-5 h-5 text-[#FFA066]" />
        </button>
      </div>
 
      <div className="max-w-2xl mx-auto px-4 relative">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100">
          <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                       bg-clip-text text-transparent text-center">
            עריכת מוצר
          </h1>
          
          <EditProductForm
            product={productt}
            onCancel={() => navigate(`/vendor/products/${id}`)}
          />
        </div>
      </div>
    </div>
  );
 };

export default EditProductPage;