import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCategories } from '../../../contexts/CategoryContext';
import { useProductFeed } from '../../../hooks/useProductFeed';
import { useSwipe } from '../../../hooks/useSwipe';
import ProductCard from '../../home/products/ProductCard';
import ProductProgress from './ProductProgress';
import ProductIndicator from './ProductIndicator';
import { LoadingState, ErrorState, EmptyState } from './LoadingState';

const ProductFeed = () => {
  const { selectedMain } = useCategories();
  const {
    products,
    currentIndex,
    direction,
    loading,
    error,
    feedRef,
    handleNavigation
  } = useProductFeed(selectedMain);

  const onSwipe = (direction) => {
    handleNavigation(direction);
  };

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipe);
  

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!products.length) return <EmptyState />;

  return (
    <div ref={feedRef} 
    className="fixed inset-0 pt-[60px] bg-gray-50"
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={products[currentIndex]._id}
          initial={{ 
            y: direction === 'down' ? '80%' : '-80%',
            opacity: 0 
          }}
          animate={{ 
            y: 0,
            opacity: 1 
          }}
          exit={{ 
            y: direction === 'down' ? '-80%' : '80%',
            opacity: 0 
          }}
          transition={{ 
            type: "tween", 
            duration: 0.25, 
            ease: "easeOut" 
          }}
          className="absolute inset-0"
        >
          <ProductCard product={products[currentIndex]} />
        </motion.div>
      </AnimatePresence>

      <ProductIndicator 
        total={products.length} 
        current={currentIndex} 
      />
      <ProductProgress 
        current={currentIndex} 
        total={products.length} 
      />
    </div>
  );
};

export default ProductFeed;