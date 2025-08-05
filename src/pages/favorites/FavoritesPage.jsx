/* needed */
// pages/favorites/FavoritesPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Home, ChevronRight, Trash2 } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import { useAuth } from '../../contexts/AuthContext';
import { useProductViewer } from '../../contexts/ProductViewerContext';
import SimpleImage from '../../components/common/SimpleImage';

import logoSvg from '../../assets/logo/new.svg';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { navigateToSpecificProduct } = useProductViewer();

  const { favorites, loading, loadFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadFavorites();
  }, [user, navigate, loadFavorites]);

  const handleRemove = async (productId) => {
    await removeFromFavorites(productId);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-50 py-8">
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
          onClick={() => navigate(-1)}
          className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
                   hover:shadow-lg hover:scale-105 transition-all duration-200"
          title="חזור אחורה"
        >
          <ChevronRight className="w-5 h-5 text-[#FFA066]" />
        </button>
      </div>

      <div className="container mx-auto px-4 pb-20 max-w-4xl">
        {/* לוגו וכותרת */}
        <div className="flex flex-col items-center mb-10">
          <img
            src={logoSvg}
            alt="BuyWise"
            className="h-16 object-contain mb-4"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                        bg-clip-text text-transparent flex items-center gap-2">
            <Heart className="w-7 h-7 text-[#FF6B6B]" />
            מוצרים שאהבתי
          </h1>
        </div>

        {/* תוכן העמוד */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden p-6">
          {loading ? (
            <div className="py-12 flex justify-center">
              <div className="w-12 h-12 border-4 border-t-[#FFA066] border-[#FFA066]/20 rounded-full animate-spin" />
            </div>
          ) : favorites.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mb-4">
                <Heart className="w-16 h-16 mx-auto text-gray-300" />
              </div>
              <h2 className="text-xl font-medium text-gray-500 mb-4">אין לך מוצרים מועדפים עדיין</h2>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2.5 bg-[#FFA066] text-white rounded-lg font-medium
                         hover:bg-[#FF8C3D] transition-colors shadow-md hover:shadow-lg"
              >
                חזרה לדף הבית
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
              {favorites.map(({ product, _id }) => (
                product && _id ? (
                  <div key={_id} className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
                    <div className="flex h-full">
                      {/* תמונת המוצר */}
                      <div className="w-1/3 flex-shrink-0">
                        <SimpleImage
                          src={product?.displayImage || product?.imageUrl}
                          alt={product?.title || 'מוצר'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* פרטי המוצר */}
                      <div className="w-2/3 p-4 flex flex-col">
                        {/* פרטי המוכר */}
                        <div className="flex items-center gap-2 mb-2">
                          <SimpleImage
                            src={product?.vendorId?.profileImage}
                            alt={product?.vendorId?.fullName || 'מוכר'}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-xs text-gray-600">{product?.vendorId?.fullName || 'מוכר'}</span>
                        </div>

                        {/* המלצת המוכר */}
                        <p className="text-sm text-gray-700 line-clamp-3 flex-grow mb-3">
                          {product?.recommendation || 'אין המלצה זמינה'}
                        </p>

                        {/* כפתורי פעולה */}
                        <div className="flex justify-between items-center mt-auto">
                          <button
                            onClick={() => {
                              navigate(`/product/${product?._id}`);
                            }}
                            className="text-[#FFA066] text-sm font-medium hover:text-[#FF8C3D] transition-colors"
                          >
                            צפה במוצר
                          </button>
                          <button
                            onClick={() => handleRemove(product?._id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors 
                                    rounded-full hover:bg-red-50"
                            title="הסר מהמועדפים"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;