import axios from 'axios'

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // your Laravel API URL
  withCredentials: true,               // needed if using Sanctum cookies
})

// Automatically attach token from localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
