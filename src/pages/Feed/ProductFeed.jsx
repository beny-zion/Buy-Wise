import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { throttle } from 'lodash';
import mockProducts from '../../../server/mockProducts.json';
import Categories from '../../../server/categories.json';
import SearchQuery from './Search';
import SellerInfo from './SellerInfo';
// Mock data for demonstration

const ProductFeed = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [products, setProducts] = useState(mockProducts);
  const [direction, setDirection] = useState('next');
  const [containerHeight, setContainerHeight] = useState('100vh');
  const feedRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Adjust container height to viewport
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const vh = window.innerHeight;
        setContainerHeight(`${vh}px`);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleNavigation = (dir) => {
    setDirection(dir);
    if (dir === 'next') {
      setCurrentProductIndex(prev =>
        prev === products.length - 1 ? 0 : prev + 1
      );
    } else if (dir === 'prev') {
      setCurrentProductIndex(prev =>
        prev === 0 ? products.length - 1 : prev - 1
      );
    }
  };

  // Wheel event handler with throttle
  const handleScroll = throttle((e) => {
    if (e.deltaY > 0) {
      handleNavigation('next');
    } else if (e.deltaY < 0) {
      handleNavigation('prev');
    }
  }, 1000); // מגביל ל-1 קריאה כל שנייה

  // Touch events handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = throttle(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = window.innerHeight * 0.2;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe) {
      handleNavigation('next');
    } else if (isDownSwipe) {
      handleNavigation('prev');
    }
  }, 1000);

  // Preload images
  useEffect(() => {
    const getAdjacentIndexes = (current) => ({
      prevIndex: (current - 1 + products.length) % products.length,
      nextIndex: (current + 1) % products.length
    });

    const { prevIndex, nextIndex } = getAdjacentIndexes(currentProductIndex);
    const imagesToPreload = [
      products[prevIndex]?.displayImage,
      products[currentProductIndex]?.displayImage,
      products[nextIndex]?.displayImage,
    ];

    imagesToPreload.forEach(src => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [currentProductIndex, products]);

  // Keyboard event handler
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      handleNavigation('prev');
    } else if (e.key === 'ArrowDown') {
      handleNavigation('next');
    }
  };

  useEffect(() => {
    const feed = feedRef.current;
    if (feed) {
      feed.addEventListener('wheel', handleScroll);
      feed.addEventListener('touchstart', handleTouchStart);
      feed.addEventListener('touchmove', handleTouchMove);
      feed.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        feed.removeEventListener('wheel', handleScroll);
        feed.removeEventListener('touchstart', handleTouchStart);
        feed.removeEventListener('touchmove', handleTouchMove);
        feed.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentProductIndex, touchStart, touchEnd]);

  const currentProduct = products[currentProductIndex] || null;

  if (!products.length) {
    return (
      <div className="h-screen w-full max-w-md mx-auto bg-black flex items-center justify-center text-white" dir="rtl">
        <p>אין מוצרים להצגה</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto bg-black relative overflow-hidden"
      style={{
        height: containerHeight,
        maxWidth: '390px',
        width: '100%'
      }}
      dir="rtl"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <div className="relative w-1/2">
          <SearchQuery categories={Categories}/>
        </div>
      </div>

      {/* Product Feed */}
      <div
        ref={feedRef}
        className="h-full w-full relative"
        style={{ perspective: '1000px' }}
        tabIndex="0"
      >
        {/* Current Product */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentProduct?.id}
            className="relative h-full"
            initial={{ y: direction === 'next' ? '100%' : '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: direction === 'next' ? '-100%' : '100%' }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: "easeInOut"
            }}
          >

            <motion.div
              className="absolute top-4 left-4 z-10 flex items-center gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
            >
              <SellerInfo currentProduct={currentProduct} />
            </motion.div>
            <motion.img
              src={currentProduct?.displayImage}
              alt={currentProduct?.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Product Info Overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-white text-2xl font-bold mb-2">{currentProduct?.title}</h2>
              <p className="text-white/90 mb-4">{currentProduct?.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-white text-xl">₪{currentProduct?.price}</span>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-full">
                  לרכישה 🛍️
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/*       {/* Category Wheels */}
      <div className="absolute bottom-24 left-0 right-0 transition-opacity duration-300 opacity-0 hover:opacity-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
        
          <div className="flex justify-center mb-2 overflow-x-auto no-scrollbar">
  <div className="bg-black/40 backdrop-blur-sm rounded-full p-2">
    <div className="flex gap-3">
                {Categories.map((category, index) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategoryIndex(index)}
                    className={`flex flex-col items-center p-2 rounded-full transition-colors
                      ${index === selectedCategoryIndex ? 'bg-blue-500/50' : 'hover:bg-white/10'}`}
                    style={{ minWidth: '60px' }}
                  >
                    <span className="text-2xl mb-1">{category.icon}</span>
                    <span className="text-white text-xs">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          
          <div className="flex justify-center">
            <div className="bg-black/40 backdrop-blur-sm rounded-full py-1 px-4">
              <div className="flex gap-2">
                {Categories[selectedCategoryIndex].subCategories.map((subCategory) => (
                  <button
                    key={subCategory}
                    className="text-white/80 hover:text-white px-3 py-1 text-sm rounded-full hover:bg-white/10 transition-colors"
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductFeed;
