
import axios from 'axios';

// Create an instance of Axios with the base URL of your Laravel API
const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Replace with your Laravel API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
