import axios from 'axios';

const API_URL = 'http://localhost:3333/products';

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProduct = async (productId) => {
  console.log("!!!!!!!!!!!!!!!!!")
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${productId}`, productData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/${productId}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const getAllProducts = async (params) => {
    try {
      const response = await axios.get(API_URL, { 
        params,
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
