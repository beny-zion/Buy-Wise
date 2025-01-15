// services/api/search.js
import axios from 'axios';

const API_URL = 'https://product-pick-server.onrender.com';

export const searchService = {
  async search(query) {
    try {
      const { data } = await axios.get(`${API_URL}/search`, {
        params: { q: query },
        withCredentials: true
      });
      return data;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }
};

