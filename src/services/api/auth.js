// src/services/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:3333';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  
});

export const login = async (credentials) => {
  try {
    return await axiosInstance.post('/user/login', credentials);
  } catch (error) {
    throw handleError(error);
  }
};

export const register = async (userData) => {
  console.log("ddd",userData)
  try {
    
    return await axiosInstance.post('/user/register', userData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  } catch (error) {
    console.log("error",error)

    throw handleError(error);
  }
};

export const updateProfile = async (userData) => {
  try {
    return await axiosInstance.put('/user/profile', userData);
  } catch (error) {
    throw handleError(error);
  }
 };

export const logout = async () => {
  try {
    return await axiosInstance.post('/user/logout');
  } catch (error) {
    throw handleError(error);
  }
};

export const getCurrentUser = async () => {
  try {
   

    const response = await axiosInstance.get('/user/current', {
     
    });
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    // Server responded with error
    throw {
      message: error.response.data.message || 'שגיאת שרת',
      status: error.response.status
    };
  } else if (error.request) {
    // Request made but no response
    throw {
      message: 'לא ניתן להתחבר לשרת',
      status: 503
    };
  } else {
    // Request setup error
    throw {
      message: 'שגיאה בשליחת הבקשה',
      status: 400
    };
  }
};