// In src/api/index.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;