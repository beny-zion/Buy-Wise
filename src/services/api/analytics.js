// services/api/analytics.js
import axios from 'axios';

const API_URL = 'http://localhost:3333/analytics';

export const analyticsService = {
  // מעקב אחר צפייה במוצר
  async trackView(productId, viewDuration) {
    console.log('productId:', productId);
    console.log('viewDuration:', viewDuration);
    try {
      await axios.post(`${API_URL}/product/view`, {
        productId,
        viewDuration
      }, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Failed to track view:', error);
    }
  },

  // מעקב אחר קליק על קישור אפיליאט
  async trackClick(productId) {
    console.log('productId:', productId);
    try {
      await axios.post(`${API_URL}/product/click`, {
        productId
      }, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  }
};