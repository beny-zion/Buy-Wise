/* needed */
// pages/vendor/VendorProductsPage.jsx - עדכון לאנליטיקה פשוטה
import React, { useState, useEffect } from 'react';
import { Home, ChevronRight, PlusCircle, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { vendorService } from '../../services/api/vendor';
import GeneralStats from '../../components/vendor/Statistics/GeneralStats';

const VendorProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // טעינת מוצרים וסטטיסטיקות
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // טעינת מוצרים וסטטיסטיקות במקביל
        const [productsResponse, statsResponse] = await Promise.all([
          vendorService.getProducts({ page, limit: 10 }),
          vendorService.getAllProductsStats()
        ]);
        
        console.log('Products Response:', productsResponse);
        console.log('Stats Response:', statsResponse);

        if (!productsResponse.success) {
          throw new Error(productsResponse.message || 'שגיאה בטעינת המוצרים');
        }

        setProducts(productsResponse.data || []);
        setTotalPages(productsResponse.pagination?.pages || 1);
        
        // שמירת הסטטיסטיקות
        if (statsResponse.success && statsResponse.data) {
          setStats(statsResponse.data);
        }
      } catch (err) {
        setError(err.message || 'שגיאה בטעינת הנתונים');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  // סינון מוצרים לפי חיפוש
  const filteredProducts = products.filter(product => 
    product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.recommendation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // כרטיס מוצר בודד
  const ProductCard = ({ product }) => {
    // חיפוש סטטיסטיקות למוצר - מבנה חדש
    const productStats = stats?.find(statItem => statItem.productId === product._id) || {
      modalOpens: 0,
      clicks: 0,
      conversionRate: 0
    };

    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-lg 
                    transition-all duration-200 border border-gray-100">
        <div className="aspect-video relative">
          <img 
            src={product.displayImage} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-medium text-base line-clamp-1">{product.title}</h3>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600 text-sm line-clamp-2 mb-3" dir="rtl">
            {product.recommendation}
          </p>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gray-50 p-2 rounded-lg text-xs text-center">
              <div className="font-bold text-gray-700">{productStats.modalOpens || 0}</div>
              <div className="text-gray-500">פתיחות</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg text-xs text-center">
              <div className="font-bold text-gray-700">{productStats.clicks || 0}</div>
              <div className="text-gray-500">קליקים</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg text-xs text-center">
              <div className="font-bold text-gray-700">{(productStats.conversionRate || 0).toFixed(1)}%</div>
              <div className="text-gray-500">המרה</div>
            </div>
          </div>
          
          <Link
            to={`/vendorPrivate/productsVendor/${product._id}`}
            className="block w-full bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] text-white 
                     text-center py-2 rounded-lg text-sm font-medium hover:shadow-md 
                     transition-all duration-200"
          >
            צפה בפרטים
          </Link>
        </div>
      </div>
    );
  };

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

        {/* כותרת וכפתור הוספה */}
        <div className="mb-8 flex justify-between items-center flex-wrap gap-4" dir="rtl">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                       bg-clip-text text-transparent inline-block">
            המוצרים שלי
          </h1>
          
          <Link 
            to="/addProducts" 
            className="flex items-center gap-2 bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                     text-white px-5 py-2.5 rounded-lg font-medium shadow-md
                     hover:shadow-lg transform hover:-translate-y-0.5
                     transition-all duration-200"
          >
            <PlusCircle className="w-5 h-5" />
            <span>הוסף מוצר חדש</span>
          </Link>
        </div>
        
        {/* סטטיסטיקות */}
        <div className="mb-12">
          <GeneralStats />
        </div>
        
        {/* חיפוש */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md mb-6">
          <div className="relative" dir="rtl">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="חיפוש מוצרים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2.5 bg-gray-50 border border-gray-100 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#FFA066] focus:border-transparent"
            />
          </div>
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
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              {searchTerm ? 'לא נמצאו מוצרים התואמים לחיפוש' : 'אין לך מוצרים עדיין'}
              
              {!searchTerm && (
                <div className="mt-4">
                  <Link 
                    to="/addProducts" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFA066] to-[#FF6B6B] 
                             text-white px-5 py-2.5 rounded-lg font-medium"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>הוסף מוצר ראשון</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {/* פגינציה */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex gap-2 rtl">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center
                                   transition-colors duration-200 ${
                                     page === pageNum
                                       ? 'bg-[#FFA066] text-white'
                                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                   }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProductsPage;