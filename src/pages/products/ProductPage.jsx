import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../../services/api/products';
import { useAuth } from '../../contexts/AuthContext';
import { Share2, Heart, AlertTriangle, Eye, Clock, ChevronRight, XIcon } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response.product);
      } catch (err) {
        setError(err.message || 'שגיאה בטעינת המוצר');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'שיתוף מוצר',
        url: window.location.href,
      });
    } else {
      setShareOpen(true);
      navigator.clipboard.writeText(window.location.href);
      setTimeout(() => setShareOpen(false), 2000);
    }
  };

  const handleAffiliateLinkClick = async () => {
    window.open(product.affiliateLink, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-sm text-gray-600">טוען את פרטי המוצר...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-4 rounded-lg shadow-lg text-center w-full max-w-sm mx-auto">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">שגיאה בטעינת המוצר</h2>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center justify-center space-x-1 mx-auto text-blue-600 text-sm hover:text-blue-700"
          >
            <ChevronRight className="w-4 h-4" />
            <span>חזור לדף הקודם</span>
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-4 rounded-lg shadow-lg text-center w-full max-w-sm mx-auto">
          <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">המוצר לא נמצא</h2>
          <p className="text-sm text-gray-600 mb-4">המוצר המבוקש אינו קיים או שהוסר</p>
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center justify-center space-x-1 mx-auto text-blue-600 text-sm hover:text-blue-700"
          >
            <ChevronRight className="w-4 h-4" />
            <span>חזור לדף הבית</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto pt-4 pb-2">
        {/* כרטיס המוצר */}
        <div className="bg-white shadow-sm">
          {/* תמונת המוצר וכפתורי פעולה */}
          <div className="relative">
            <img 
              src={product.imageUrl} 
              alt="תמונת המוצר"
              className="w-full h-72 object-cover"
            />
            <div className="absolute top-3 right-3">
              <button 
                onClick={() => navigate('/')}
                className="p-2 bg-white rounded-full shadow hover:bg-gray-50"
                title="חזור לדף הבית"
              >
                <XIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="absolute top-3 left-3 flex space-x-2">
              <button 
                onClick={handleShare}
                className="p-2 bg-white rounded-full shadow hover:bg-gray-50"
                title="שתף"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              {shareOpen && (
                <div className="absolute top-10 right-0 bg-black text-white text-xs py-1 px-2 rounded">
                  הקישור הועתק!
                </div>
              )}
            </div>
          </div>

          {/* תוכן המוצר */}
          <div className="p-4">
            {/* פרטי המוכר */}
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={product.vendorId.profileImage || '/default-avatar.png'}
                alt={product.vendorId.fullName}
                className="w-10 h-10 rounded-full border border-gray-200"
              />
              <div>
                <h3 className="text-base font-medium text-gray-900">
                  {product.vendorId.fullName}
                </h3>
                <p className="text-xs text-gray-500">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* המלצת המוכר */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                ההמלצה שלי על המוצר
              </h2>
              <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {product.recommendation}
              </p>
            </div>

            {/* סטטיסטיקות */}
            <div className="grid grid-cols-3 gap-2 border-t border-b border-gray-200 py-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Eye className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-lg font-bold text-gray-900">
                    {product.stats?.views || 0}
                  </span>
                </div>
                <span className="text-xs text-gray-500">צפיות</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-lg font-bold text-gray-900">
                    {product.stats?.likes || 0}
                  </span>
                </div>
                <span className="text-xs text-gray-500">לייקים</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-lg font-bold text-gray-900">
                    {product.stats?.avgViewTime ? `${Math.round(product.stats.avgViewTime)}s` : '0s'}
                  </span>
                </div>
                <span className="text-xs text-gray-500">זמן צפייה</span>
              </div>
            </div>

            {/* כפתור קנייה */}
            <button
              onClick={handleAffiliateLinkClick}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              לרכישה באלי אקספרס
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;