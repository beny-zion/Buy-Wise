// services/api/vendor.js
import axios from 'axios';

const API_URL = 'http://localhost:3333/vendor';

export const vendorService = {
  // קבלת כל המוצרים של המוכר
  async getProducts() {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // קבלת מוצר ספציפי
  async getProduct(productId) {
    try {
      const response = await axios.get(`${API_URL}/products/${productId}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // קבלת סטטיסטיקות כלליות
  async getStats(dateRange) {
    try {
      const response = await axios.get(`${API_URL}/analytics/stats`, {
        params: dateRange,
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // קבלת סטטיסטיקות למוצר ספציפי
  async getProductStats(productId, dateRange) {
    try {
      const response = await axios.get(`${API_URL}/analytics/product/${productId}/stats`, {
        params: dateRange,
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};