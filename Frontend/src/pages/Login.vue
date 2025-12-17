<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
    
    <div class="bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-sm">
      
      <h2 class="text-3xl font-bold text-white mb-8 text-center">Login</h2>

      <form @submit.prevent="login" class="space-y-6">
        
        <div class="form-group">
          <label for="email" class="text-white">Email</label>
          <input 
            type="email" 
            id="email"
            v-model="email" 
            
            required 
            class="rounded-lg w-full text-white h-10 border border-white "
          />
        </div>

        <div class="form-group">
          <label for="password" class="block text-sm font-medium text-white mb-1">Password</label>
          <input 
            type="password" 
            id="password"
            v-model="password" 
            
            required 
            class="rounded-lg w-full text-white h-10 border border-white "
          />
        </div>

        <button 
          type="submit" 
          class="boarder-solid bg-white text-black pa-3 rounded-lg w-full"
          >
          Login
        </button>

        <div class="flex justify-between items-center pt-2">
          
          <router-link 
            to="/register" 
            class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Don't have an account?
          </router-link>
          
          <router-link 
            to="/forgotaccount" 
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            Forgot Password?
          </router-link>

          <p></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Script remains the same
import { ref } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const login = async () => {
  try {
    const res = await api.post('/Login', { email: email.value, password: password.value })
    localStorage.setItem('token', res.data.token)
    alert(res.data.message)
    router.push('/Profile')
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || 'Login failed. Please check your credentials.'
    alert(errorMessage)
  }
}
</script>