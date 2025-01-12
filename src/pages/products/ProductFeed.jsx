import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { throttle } from 'lodash';
import { getAllProducts } from '../../services/api/products';
import ProductCard from '../../components/home/products/ProductCard';

const ProductFeed = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
    const feedRef = useRef(null);
    const isNavigatingRef = useRef(false);
    const initialLoadDoneRef = useRef(false);

    // טעינת מוצרים ראשונית - רק פעם אחת
    useEffect(() => {
        const loadInitialProducts = async () => {
            if (initialLoadDoneRef.current) return;
            
            try {
                setLoading(true);
                const response = await getAllProducts({ page: 1, limit: 10 });
                const newProducts = response.products;

                setProducts(newProducts);
                setHasMore(newProducts.length === 10);

                // מציאת האינדקס הנכון אם יש ID
                if (id) {
                    const index = newProducts.findIndex(p => p._id === id);
                    if (index !== -1) {
                        setCurrentIndex(index);
                    }
                }

                initialLoadDoneRef.current = true;
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadInitialProducts();
    }, [id]);

    // טעינת מוצרים נוספים
    const loadMoreProducts = useCallback(async () => {
        if (!hasMore || loadingMore) return;

        try {
            setLoadingMore(true);
            const nextPage = Math.floor(products.length / 10) + 1;
            const response = await getAllProducts({ page: nextPage, limit: 10 });
            const newProducts = response.products;
            console.log(newProducts);

            if (newProducts.length) {
                setProducts(prev => [...prev, ...newProducts]);
                setCurrentPage(nextPage);
                setHasMore(newProducts.length === 10);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error('Error loading more products:', err);
        } finally {
            setLoadingMore(false);
        }
    }, [hasMore, loadingMore, products.length]);

    // ניווט בין מוצרים
    const handleNavigation = useCallback(async (dir) => {
        if (isNavigatingRef.current) return;

        isNavigatingRef.current = true;
        setDirection(dir);

        const newIndex = dir === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (newIndex >= 0 && newIndex < products.length) {
            setCurrentIndex(newIndex);
            
            // טעינת מוצרים נוספים כשמתקרבים לסוף
            if (dir === 'down' && newIndex >= products.length - 3) {
                await loadMoreProducts();
            }

            // עדכון URL
            navigate(`/product/${products[newIndex]._id}`);
        }

        setTimeout(() => {
            isNavigatingRef.current = false;
        }, 1000);
    }, [currentIndex, products, loadMoreProducts, navigate]);

    // טיפול בגלילה
    useEffect(() => {
        const handleWheel = throttle((e) => {
            e.preventDefault();
            const threshold = 1;
            const direction = e.deltaY;
            console.log(direction);

            if (Math.abs(direction) < threshold) return;

            handleNavigation(direction > 0 ? 'down' : 'up');
        }, 400);

        const element = feedRef.current;
        if (element) {
            element.addEventListener('wheel', handleWheel, { passive: false });
            return () => element.removeEventListener('wheel', handleWheel);
        }
    }, [handleNavigation]);

    // להוסיף אחרי useEffect של הגלילה
useEffect(() => {
    const handleKeyDown = throttle((e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            handleNavigation('up');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            handleNavigation('down');
        }
    }, 200); // אותו throttle כמו בגלילה

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
}, [handleNavigation]);

    // Loading, Error and Empty states
    if (loading) return <div className="h-screen flex items-center justify-center">טוען...</div>;
    if (error) return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;
    if (!products.length) return <div className="h-screen flex items-center justify-center">אין מוצרים</div>;

    return (
        <div ref={feedRef} className="fixed inset-0 pt-[60px]">
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={products[currentIndex]._id}
                    initial={{ y: direction === 'down' ? '80%' : '-80%' }}
                    animate={{ y: 0 }}
                    exit={{ y: direction === 'down' ? '-80%' : '80%' }}
                    transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <ProductCard product={products[currentIndex]} />
                </motion.div>
            </AnimatePresence>

            {/* מחוון מיקום */}
            <div className="fixed left-4 top-1/2 -translate-y-1/2">
                <div className="space-y-2">
                    {products.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-colors duration-300
                                ${idx === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
            </div>

            {/* סרגל התקדמות */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200">
                <div 
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${(currentIndex / (products.length - 1)) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default ProductFeed;