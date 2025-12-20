<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
    
    <div class="bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-sm">
      
      <h2 class="text-3xl font-bold text-white mb-8 text-center">login</h2>

      <form @submit.prevent="login" class="space-y-6">
        
        <div class="form-group">
          <label for="email" class="text-white">Email</label>
          <input 
            type="email" 
            id="email"
            v-model="email" 
            
            required 
            class="rounded-lg w-full text-white h-10 border border-white bg-zinc-700 p-2"
          />
        </div>

        <div class="form-group">
          <label for="password" class="block text-sm font-medium text-white mb-1">Password</label>
          <input 
            type="password" 
            id="password"
            v-model="password" 
            
            required 
            class="rounded-lg w-full text-white h-10 border border-white bg-zinc-700 p-2"
          />
        </div>

        <button 
          type="submit" 
          class="bg-white text-black p-3 rounded-lg w-full font-semibold hover:bg-gray-200"
          >
          login
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
        
        <!-- Resend Verification Email Option -->
        <div class="mt-4 pt-4 border-t border-gray-600 text-center">
          <p class="text-sm text-gray-400 mb-2">Email not verified?</p>
          <button 
            type="button"
            @click="resendVerification" 
            class="text-blue-400 hover:text-blue-300 underline text-sm"
            :disabled="resending"
          >
            {{ resending ? 'Sending...' : 'Resend Verification Email' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Script remains the same
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const resending = ref(false)

const login = async () => {
  try {
    console.log('Attempting login with:', email.value)
    
    await authStore.login({
      email: email.value,
      password: password.value,
    });

    console.log('Login successful, auth store state:', {
      user: authStore.user,
      token: authStore.token
    });

    alert('Login Successful');
    
    // Redirect to profile
    console.log('Redirecting to /profile...')
    await router.push('/profile');
    
  } catch (err: any) {
    console.error('Login error:', err)
    let errorMessage = 'Login failed. Check credentials';
    
    // Check if error is due to unverified email
    if (err.response?.data?.message) {
        errorMessage = err.response.data.message
        
        // If email not verified, save email for resend functionality
        if (errorMessage.toLowerCase().includes('verify') || errorMessage.toLowerCase().includes('unverified')) {
            localStorage.setItem('registration_email', email.value)
        }
    }
    
    alert(errorMessage);
  }
};

const resendVerification = async () => {
    if (!email.value) {
        alert('Please enter your email address first')
        return
    }
    
    try {
        resending.value = true
        // Save email for potential OTP verification
        localStorage.setItem('registration_email', email.value)
        
        await authStore.sendOtp(email.value)
        alert('Verification email sent! Please check your inbox and verify your email.')
        router.push('/two_factor')
    } catch (err: any) {
        console.error(err)
        alert('Failed to send verification email: ' + (err.response?.data?.message || err.message))
    } finally {
        resending.value = false
    }
}
</script>