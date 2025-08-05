/* needed */
// pages/vendor/EditProductPage.jsx - עדכון לאנליטיקה פשוטה
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { vendorService } from '../../services/api/vendor';
import { useAuth } from '../../contexts/AuthContext';
import ProductCardEditor from '../../newProductFormComponent/ProductCardEditor';

// פונקציית אדפטר למיפוי נתוני המוצר למבנה אחיד
const mapProductToEditorFormat = (product) => {
  const mainImage = product.displayImage || 
                   (product.images && product.images.main) || 
                   (Array.isArray(product.images) && product.images[0]) || 
                   '';
  
  let smallImages = [];
  if (Array.isArray(product.images)) {
    smallImages = product.images.filter(img => img !== mainImage);
  } else if (product.images && Array.isArray(product.images.small)) {
    smallImages = product.images.small;
  }
  
  const videoUrl = product.product_video_url || 
                  (product.aliExpressData && product.aliExpressData.product_video_url) || 
                  '';
  
  return {
    title: product.title || '',
    recommendation: product.recommendation || '',
    images: {
      main: mainImage,
      small: smallImages
    },
    product_video_url: videoUrl,
    aliExpressData: product.aliExpressData || {},
    affiliateLink: product.affiliateLink || '',
    originalData: product
  };
};

const EditProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await vendorService.getProduct(id);
        
        if (!response.success || !response.data) {
          throw new Error('מוצר לא נמצא');
        }
        
        const mappedProduct = mapProductToEditorFormat(response.data);
        setProduct(mappedProduct);
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err.message || 'שגיאה בטעינת המוצר');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleSave = async (editedData) => {
    try {
      setLoading(true);
      
      // המרת נתונים לפורמט המתאים לשרת
      const updatedProductData = {
        title: editedData.title,
        recommendation: editedData.recommendation,
        displayImage: editedData.displayMedia
        // שדות נוספים לפי הצורך...
      };
      
      const response = await vendorService.updateProduct(id, updatedProductData);
      
      if (response.success) {
        // ניווט פשוט חזרה לעמוד הפרטי של המוצר במוכר
        navigate(`/vendorPrivate/productsVendor/${id}`);
      } else {
        throw new Error(response.message || 'שגיאה בעדכון המוצר');
      }
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err.message || 'שגיאה בעדכון המוצר');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-[#FFA066] border-t-transparent rounded-full" />
      </div>
    );
  }
 
  if (error || !product) {
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
          onClick={() => navigate(`/vendorPrivate/productsVendor/${id}`)}
          className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
                   hover:shadow-lg hover:scale-105 transition-all duration-200"
          title="חזרה לפרטי המוצר"
        >
          <ChevronRight className="w-5 h-5 text-[#FFA066]" />
        </button>
      </div>
 
      <div className="max-w-6xl mx-auto px-4 relative">
        <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                     bg-clip-text text-transparent text-center">
          עריכת מוצר
        </h1>
        
        <ProductCardEditor 
          productData={product}
          onSave={handleSave}
          user={user}
        />
      </div>
    </div>
  );
};

export default EditProductPage;