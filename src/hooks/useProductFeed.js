// src/hooks/useProductFeed.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productFeedService } from '../services/productFeed';
import { useAnalytics } from './useAnalytics';


export const useProductFeed = (selectedCategory = null) => {
    const { stopTracking } = useAnalytics();
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const feedRef = useRef(null);
  const initialLoadDoneRef = useRef(false);
// אחרי כל ה-useState והרפרנסים הקיימים
const currentCategoryRef = useRef(selectedCategory?._id);

useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        
        // טעינה ראשונית או שינוי קטגוריה - שניהם מאפסים את האינדקס
        setCurrentIndex(0);  
        
        const params = { page: 1, limit: 10 };
        if (selectedCategory?._id) {
          params.category = selectedCategory._id;
        }
  
        const { products: newProducts, hasMore: hasMoreProducts } = 
          await productFeedService.loadProducts(params);
  
        setProducts(newProducts);
        setHasMore(hasMoreProducts);
        
        // עדכון הקטגוריה הנוכחית
        currentCategoryRef.current = selectedCategory?._id;
  
        // אם יש ID בURL, מוצאים את המוצר המתאים
        if (id) {
          const index = newProducts.findIndex(p => p._id === id);
          if (index !== -1) {
            setCurrentIndex(index);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    // טוען בטעינה ראשונית או כשהקטגוריה משתנה
    if (!initialLoadDoneRef.current || currentCategoryRef.current !== selectedCategory?._id) {
      loadProducts();
      initialLoadDoneRef.current = true;
    }
  }, [selectedCategory?._id, id]);

  // טעינת מוצרים נוספים
  const loadMoreProducts = useCallback(async () => {
    if (!hasMore || loadingMore) return;

    try {
      setLoadingMore(true);
      const nextPage = Math.floor(products.length / 10) + 1;
      const params = { page: nextPage, limit: 10 };

      if (selectedCategory?._id) {
        params.category = selectedCategory._id;
      }

      const { products: newProducts, hasMore: hasMoreProducts } = 
        await productFeedService.loadProducts(params);

      if (newProducts.length) {
        setProducts(prev => [...prev, ...newProducts]);
        setHasMore(hasMoreProducts);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading more products:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, products.length, selectedCategory]);

  // הגדרת Event Handlers
  useEffect(() => {
    const callbacks = {
      onDirectionChange: setDirection,
    //   onIndexChange: setCurrentIndex,
    onIndexChange: (newIndex) => {
        setCurrentIndex(newIndex);
        // אין צורך להוסיף פה מעקב כי useProductTracking מטפל בזה
      },
      onLoadMore: loadMoreProducts,
      onNavigate: navigate
    };

    const scrollHandler = productFeedService.createScrollHandler(
      currentIndex,
      products,
      callbacks
    );

    const keyboardHandler = productFeedService.createKeyboardHandler(
      currentIndex,
      products,
      callbacks
    );

    const element = feedRef.current;
    if (element) {
      element.addEventListener('wheel', scrollHandler, { passive: false });
      window.addEventListener('keydown', keyboardHandler);

      return () => {
        element.removeEventListener('wheel', scrollHandler);
        window.removeEventListener('keydown', keyboardHandler);
      };
    }
  }, [currentIndex, products, loadMoreProducts, navigate, stopTracking]);

  return {
    products,
    currentIndex,
    direction,
    loading,
    loadingMore,
    hasMore,
    error,
    feedRef
  };
};