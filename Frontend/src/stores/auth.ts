import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api'

interface User {
  id?: number
  name: string
  email: string
  first_name?: string
  last_name?: string
  image?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref('')

  const register = async (data: { name: string; first_name?: string; last_name?: string; email: string; password: string; password_confirmation: string }) => {
    // Using alias /register or /auth/register
    await api.post('/auth/register', data)
  }

  const verifyOtp = async (data: { email: string; otp: string }) => {
    // Route: /auth/email/verify-otp
    const res = await api.post('/auth/email/verify-otp', data)
    // Assuming response contains token/user
    if (res.data.token) {
      user.value = res.data.user
      token.value = res.data.token
      localStorage.setItem('token', res.data.token)
    }
    return res.data
  }

  // Helper to send OTP if needed explicitly
  const sendOtp = async (email: string) => {
    await api.post('/auth/email/send-otp', { email })
  }

  const login = async (data: { email: string; password: string }) => {
    // Route: /auth/login
    const res = await api.post('/auth/login', data)

    console.log('Login response:', res.data)

    // Handle different response formats
    // Could be: res.data.token, res.data.data.token, or res.data.access_token
    const tokenValue = res.data.token || res.data.data?.token || res.data.access_token
    const userData = res.data.user || res.data.data?.user || res.data.data

    if (tokenValue) {
      user.value = userData
      token.value = tokenValue
      localStorage.setItem('token', tokenValue)
      console.log('Login successful, token saved:', tokenValue)
      console.log('User data:', userData)
    } else {
      console.error('No token found in response:', res.data)
      throw new Error('Login response missing token')
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout', {}, { headers: { Authorization: `Bearer ${token.value}` } })
    } catch (e) {
      console.error(e)
    }
    user.value = null
    token.value = ''
    localStorage.removeItem('token')
  }

  const fetchUser = async () => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      token.value = storedToken
      try {
        // Route: /auth/user
        const res = await api.get('/auth/user')
        // Handle both res.data and res.data.data formats
        user.value = res.data.user || res.data.data || res.data
        console.log('User fetched successfully:', user.value)
      } catch (e) {
        console.error('Failed to fetch user:', e)
        user.value = null
        token.value = ''
        localStorage.removeItem('token')
      }
    }
  }

  const forgotPassword = async (email: string) => {
    // Route: /auth/forgot-password
    await api.post('/auth/forgot-password', { email })
  }

  const resetPassword = async (data: { email: string; otp: string; password: string; password_confirmation: string }) => {
    // Route: /auth/reset-password
    await api.post('/auth/reset-password', data)
  }

  const updateProfile = async (data: { name?: string; email?: string; password?: string; password_confirmation?: string }) => {
    // Route: PUT /auth/profile
    const res = await api.put('/auth/profile', data)
    // Update local user state
    user.value = res.data.user || res.data.data || res.data
  }

  const changePassword = async (data: { current_password: string; new_password: string; new_password_confirmation: string }) => {
    // Use the /auth/profile route with password fields
    await api.put('/auth/profile', {
      current_password: data.current_password,
      password: data.new_password,
      password_confirmation: data.new_password_confirmation
    })
  }

  return { user, token, register, verifyOtp, sendOtp, login, logout, fetchUser, forgotPassword, resetPassword, updateProfile, changePassword }
})
