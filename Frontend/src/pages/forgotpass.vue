<template>
   <div class="min-h-screen flex items-center justify-center bg-zinc-900 p-4">

    <div class="bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-md">
            <h1 class="text-3xl font-bold text-white mb-8 text-center">Two Factor Authentication</h1>
            <form>
                <label for="code" class="text-white text-2xl">Verification Code</label>
                <input class="rounded-lg w-full text-white h-10 border-white" type="text" id="code" v-model="code" required>
                <button class="boarder-solid bg-white text-black pa-3 rounded-lg w-full cursor-pointer" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const code = ref('')

const login = async () => {
  try {
    const res = await api.post('/two_factor', { code: code.value })
    localStorage.setItem('token', res.data.token)
    alert(res.data.message)
    router.push('/login')
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || 'Login failed. Please check your credentials.'
    alert(errorMessage)
  }
}
</script>
<style scoped>
</style>
