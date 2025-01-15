// components/products/ProductCard/hooks/useProductTracking.js
import { useEffect } from 'react';
import { useAnalytics } from '../../../../hooks/useAnalytics';

export const useProductTracking = (productId) => {
  const { startTracking, trackClick } = useAnalytics();

  // התחלת מעקב כשהמוצר מוצג
  useEffect(() => {
    if (productId) {
      startTracking(productId);
    }
  }, [productId]);

  // טיפול בקליק על קישור אפיליאט
  const handleAffiliateClick = () => {
    if (productId) {
      trackClick(productId);
    }
  };

  return {
    handleAffiliateClick
  };
};