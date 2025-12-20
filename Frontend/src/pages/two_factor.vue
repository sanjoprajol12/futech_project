<template>
   <div class="min-h-screen flex items-center justify-center bg-zinc-900 p-4">

    <div class="bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-md">
            <h1 class="text-3xl font-bold text-white mb-8 text-center">Email Verification</h1>
            <form @submit.prevent="verify">
                <label for="code" class="text-white text-2xl">Verification Code</label>
                <input class="rounded-lg w-full text-white h-10 border-white bg-zinc-700 p-2 mt-2 mb-4" type="text" id="code" v-model="code" required>
                <button class="bg-white text-black p-3 rounded-lg w-full cursor-pointer font-semibold hover:bg-gray-200" type="submit">Verify</button>
                
                <div class="mt-4 text-center">
                    <button 
                        type="button"
                        @click="resendOtp" 
                        class="text-blue-400 hover:text-blue-300 underline"
                        :disabled="resending"
                    >
                        {{ resending ? 'Sending...' : 'Resend OTP' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const code = ref('')
const resending = ref(false)

const verify = async () => {
  try {
    // Verify using the email saved during registration
    const email = localStorage.getItem('registration_email')
    if (!email) {
        alert('Email not found. Please register again.')
        router.push('/register')
        return
    }
    
    await authStore.verifyOtp({ email: email, otp: code.value }) 
    // Clear temp email
    localStorage.removeItem('registration_email')
    
    alert('Verification successful! You can now login.')
    // Check if user is logged in (token present), if so, profile, else login
    // Our store logic for verifyOtp sets token if returned.
    if (authStore.user) {
        router.push('/profile')
    } else {
        router.push('/login')
    }
  } catch (err: any) {
    console.error(err)
    let errorMessage = 'Verification failed.'
    if (err.response?.data?.message) {
        errorMessage = err.response.data.message
    } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error
    }
    alert(errorMessage)
  }
}

const resendOtp = async () => {
    try {
        resending.value = true
        const email = localStorage.getItem('registration_email')
        if (!email) {
            alert('Email not found. Please register again.')
            router.push('/register')
            return
        }
        
        await authStore.sendOtp(email)
        alert('OTP resent! Please check your email.')
    } catch (err: any) {
        console.error(err)
        alert('Failed to resend OTP: ' + (err.response?.data?.message || err.message))
    } finally {
        resending.value = false
    }
}
</script>
<style scoped>
</style>
