<template>
    <div class="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
        <div class="bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-sm">
        <h2 class="text-3xl font-bold text-white mb-8 text-center">Forgot Account</h2>
        <form>
            <label for="email" class="text-white text-2xl">Email</label>
            <input class="rounded-lg w-full text-white h-10 border-white" type="email" id="email" v-model="email" required>
            <button class="boarder-solid bg-white text-black pa-3 rounded-lg w-full cursor-pointer" type="submit">Submit</button>
            <p class="text-white"><a href="/Login">Login</a></p>
            <p class="text-white"><a href="/Register">Register</a></p>
        </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')

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
