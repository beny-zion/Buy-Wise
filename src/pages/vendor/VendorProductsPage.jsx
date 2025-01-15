// pages/vendor/VendorProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { Home, ChevronRight, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { vendorService } from '../../services/api/vendor';
import ProductsList from '../../components/vendor/ProductsList/index';
import GeneralStats from '../../components/vendor/Statistics/GeneralStats';

const VendorProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await vendorService.getProducts();
        console.log(response.data);
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div className="p-4">טוען...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* רקע דקורטיבי */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-[#FFA066]/5 rounded-full blur-3xl" />
        <div className="absolute -left-1/4 top-1/3 w-1/2 h-1/2 bg-[#FF6B6B]/5 rounded-full blur-3xl" />
      </div>

      {/* תוכן העמוד */}
      <div className="container mx-auto px-4 py-8 relative">
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
            onClick={() => navigate('/profile')}
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
                     hover:shadow-lg hover:scale-105 transition-all duration-200"
            title="חזור אחורה"
          >
            <ChevronRight className="w-5 h-5 text-[#FFA066]" />
          </button>
        </div>

        {/* כותרת */}
        <div className="mb-8 text-center" dir="rtl">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                       bg-clip-text text-transparent inline-block">
            המוצרים שלי
          </h1>
        </div>
        
        {/* סטטיסטיקות */}
        <div className="mb-12">
          <GeneralStats />
        </div>
        
        {/* רשימת מוצרים */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FFA066] border-t-transparent" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8 bg-red-50/50 rounded-xl">
              {error}
            </div>
          ) : (
            <ProductsList products={products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProductsPage;