import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SearchPanel from '../../components/search/SearchPanel';
import CategoryWheel from '../../components/categories/CategoryWheel';
import ProfileCircle from '../../components/home/navigation/ProfileCircle';
import ProductCard from '../../components/home/products/ProductCard';
import { getAllProducts, getProduct } from '../../services/api/products';
import { CategoryProvider, useCategories } from '../../contexts/CategoryContext';

const HomeContent = () => {
  const { productId } = useParams();
  const { selectedMain, selectedSub } = useCategories();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const observerRef = useRef(null);
  const lastProductRef = useRef(null);

  // איפוס הדף כשמשתנה הקטגוריה
  useEffect(() => {
    setPage(1);
    setProducts([]);
  }, [selectedMain, selectedSub]);

  // טעינת מוצר מודגש
  useEffect(() => {
    if (productId) {
      const loadFeaturedProduct = async () => {
        try {
          const response = await getProduct(productId);
          setFeaturedProduct(response.product);
        } catch (err) {
          setError(err.message);
        }
      };
      loadFeaturedProduct();
    }
  }, [productId]);

  // Intersection Observer להטענה אינסופית
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    observerRef.current = observer;

    if (lastProductRef.current) {
      observer.observe(lastProductRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  // טעינת מוצרים
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '10'
        });
        
        // הוספת קטגוריה רק אם יש קטגוריה נבחרת
        if (selectedMain?._id) {
          params.append('category', selectedMain._id);
        }
        
        const response = await getAllProducts(params);
        
        if (page === 1) {
          setProducts(response.products);
        } else {
          setProducts(prev => [...prev, ...response.products]);
        }
        
        if (!response.products.length && page === 1) {
          setHasMore(false);
        } else {
          setHasMore(response.pagination?.currentPage < response.pagination?.totalPages);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, selectedMain]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-40">
        <SearchPanel />
      </header>

      {/* CategoryWheel מגיע אוטומטית עם SearchPanel */}
      <CategoryWheel />

      {/* Main Content */}
      <main className="pt-20 pb-24 container mx-auto px-4 max-w-[500px]">
        {/* Selected Category Display */}
        {(selectedMain) && (
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-600" dir="rtl">
            {selectedMain && (
              <span>{selectedMain.name}</span>
            )}
            {selectedMain && selectedSub && (
              <span>{'>'}</span>
            )}
            {selectedSub && (
              <span>{selectedSub.name}</span>
            )}
          </div>
        )}

        {/* Featured Product */}
        {featuredProduct && (
          <div className="mb-8">
            <ProductCard product={featuredProduct} />
          </div>
        )}

        {/* Product List */}
        <div className="space-y-4">
          {products.map((product, index) => (
            <div 
              key={product._id}
              ref={index === products.length - 1 ? lastProductRef : null}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-500 py-4">
            {error}
          </div>
        )}

        {/* No Products State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            לא נמצאו מוצרים בקטגוריה זו
          </div>
        )}
      </main>

      {/* Navigation */}
      <ProfileCircle />
    </div>
  );
};

const HomePage = () => (
  <CategoryProvider>
    <HomeContent />
  </CategoryProvider>
);

// export default HomePage;