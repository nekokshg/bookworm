// services/axiosConfig.js
import axios from 'axios';

const instance = axios.create();

// Response interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message?.toLowerCase().includes('token')
    ) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.setItem('expiredMessage', 'Your session has expired. Please log in again.');

      // Redirect
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default instance;
