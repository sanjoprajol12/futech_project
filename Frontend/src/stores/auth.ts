import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api'

interface User {
  id?: number
  first_name: string
  last_name: string
  email: string
  image?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref('')

  const register = async (data: { first_name: string; last_name: string; email: string; password: string }) => {
    const res = await api.post('/register', data)
    user.value = res.data.user
    token.value = res.data.token
    // Save token locally if needed
    localStorage.setItem('token', res.data.token)
  }

  const login = async (data: { email: string; password: string }) => {
    const res = await api.post('/login', data)
    user.value = res.data.user
    token.value = res.data.token
    localStorage.setItem('token', res.data.token)
  }

  const logout = async () => {
    await api.post('/logout', {}, { headers: { Authorization: `Bearer ${token.value}` } })
    user.value = null
    token.value = ''
    localStorage.removeItem('token')
  }

  const fetchUser = async () => {
    if (localStorage.getItem('token')) {
      const res = await api.get('/user', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      user.value = res.data
    }
  }

  return { user, token, register, login, logout, fetchUser }
})
