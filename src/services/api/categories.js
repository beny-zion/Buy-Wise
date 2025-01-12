// services/api/categories.js
import axios from 'axios';

const API_URL = 'http://localhost:3333';

export const categoryService = {
  
  getActiveCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/categories/active`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  async getAll() {
    try {
      const { data } = await axios.get(`${API_URL}/categories`, {
        withCredentials: true
      });
      return data;
    } catch (error) {
      console.error('Categories fetch error:', error);
      throw error;
    }
  },

  async getSubCategories(parentId) {
    try {
      const { data } = await axios.get(`${API_URL}/categories/${parentId}/sub`, {
        withCredentials: true
      });
      return data;
    } catch (error) {
      console.error('Sub-categories fetch error:', error);
      throw error;
    }
  }
};