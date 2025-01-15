// hooks/useAnalytics.js
import { useEffect, useRef } from 'react';
import { analyticsService } from '../services/api/analytics';

export const useAnalytics = () => {
  const viewStartTime = useRef(null);
  const currentProductId = useRef(null);

  // התחלת מעקב אחר צפייה במוצר
  const startTracking = (productId) => {
    if (currentProductId.current === productId) return;

    // שליחת נתוני הצפייה הקודמת אם קיימת
    if (currentProductId.current && viewStartTime.current) {
      const duration = (Date.now() - viewStartTime.current) / 1000 / 60; // המרה לדקות
      analyticsService.trackView(currentProductId.current, duration);
    }

    // התחלת מעקב חדש
    currentProductId.current = productId;
    viewStartTime.current = Date.now();
  };

  // סיום מעקב (למשל בעת עזיבת הדף)
  const stopTracking = () => {
    if (currentProductId.current && viewStartTime.current) {
      const duration = (Date.now() - viewStartTime.current) / 1000 / 60;
      analyticsService.trackView(currentProductId.current, duration);
      
      currentProductId.current = null;
      viewStartTime.current = null;
    }
  };

  // מעקב אחר קליק
  const trackClick = (productId) => {
    analyticsService.trackClick(productId);
  };

  // ניקוי בעת עזיבת הדף
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  return {
    startTracking,
    stopTracking,
    trackClick
  };
};