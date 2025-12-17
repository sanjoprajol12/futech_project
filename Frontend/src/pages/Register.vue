<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
    
    <div class="bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-md">
      
      <h2 class="text-3xl font-bold text-white mb-8 text-center">Create Your Account</h2>

      <form @submit.prevent="register" class="space-y-6">
        
        <div>
          <label class="text-white ">First Name</label><br></br>
          <input 
            type="text" 
            id="name"
            v-model="user.name" 
            
            required
            class=" rounded-lg w-full text-white h-10 border border-white "
          />
        </div>
        <div>
          <label class="text-white ">Last Name</label><br></br>
          <input 
            type="text" 
            id="name"
            v-model="user.last_name" 
            
            required
            class=" rounded-lg w-full text-white h-10 "
          />
        </div>

        <div>
          <label style="color: white;" >Email</label><br></br>
          <input 
            type="email" 
            id="email"
            v-model="user.email" 
       
            required
            class=" rounded-lg w-full text-white h-10 "/>
        </div>

        <div>
          <label style="color: white;" >Password</label><br></br>
          <input 
            type="password" 
            id="password"
            v-model="user.password" 
            
            required
class="border-white rounded-lg w-full text-white h-10 "
          />
        </div>

        <div>
          <label style="color: white;" >Confirm Password</label><br></br>
          <input 
            type="password" 
            id="password_confirmation"
            v-model="user.password_confirmation" 
            
            required
            class="border-white rounded-lg w-full text-white h-10 "/>
        </div>

        <div>
          <button 
            type="submit"
            class="boarder-solid bg-white text-black pa-3 rounded-lg w-full cursor-pointer"
          >
            Register
          </button>
        </div>
        
        <p class="text-sm text-center text-white">
            Already have an account? 
            <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                Log in
            </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Your script remains unchanged
import { reactive } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const register = async () => {
  try {
    const res = await api.post('/register', {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    })
    // Added a more user-friendly message based on standard registration flow
    alert('Registration successful! Please check your email to verify your account.') 
    router.push('/login')
  } catch (err: any) {
    // Improved error handling to show specific backend errors
    const errorMessage = err.response?.data?.message || err.response?.data?.errors?.email?.[0] || 'Registration failed. Please check your inputs.'
    alert(errorMessage)
  }
}
</script>