<template>
    <div class="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
        <div class="bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-sm">
        <h2 class="text-3xl font-bold text-white mb-8 text-center">Forgot Account</h2>
        <form @submit.prevent="submit">
            <label for="email" class="text-white text-2xl">Email</label>
            <input class="rounded-lg w-full text-white h-10 border-white" type="email" id="email" v-model="email" required>
            <button class="boarder-solid bg-white text-black pa-3 rounded-lg w-full cursor-pointer" type="submit">Submit</button>
            <div class="mt-4">
                <p class="text-white"><router-link to="/login">Login</router-link></p>
                <p class="text-white"><router-link to="/register">Register</router-link></p>
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

const email = ref('')

const submit = async () => {
  try {
    await authStore.forgotPassword(email.value)
    // Save email for next steps
    localStorage.setItem('reset_email', email.value)
    alert('Please check your email for the verification code.')
    router.push('/forgotpass')
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Request failed.'
    alert(errorMessage)
  }
}
</script>
