<template>
    <div class="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
        <div class="bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-md">
            <h1 class="text-3xl font-bold text-white mb-8 text-center">Update Password</h1>
            <form @submit.prevent="updatepassword" class="space-y-4">
                <div>
                    <label for="password" class="text-white block mb-2">New Password</label>
                    <input class="rounded-lg w-full text-white h-10 bg-zinc-700 p-2" type="password" id="password" v-model="password" required>
                </div>
                <div>
                    <label for="password_confirmation" class="text-white block mb-2">Confirm New Password</label>
                    <input class="rounded-lg w-full text-white h-10 bg-zinc-700 p-2" type="password" id="password_confirmation" v-model="password_confirmation" required>
                </div>
                <button class="bg-white text-black p-3 rounded-lg w-full cursor-pointer font-semibold hover:bg-gray-200" type="submit">Update Password</button>
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

const password = ref('')
const password_confirmation = ref('')

const updatepassword = async () => {
  const email = localStorage.getItem('reset_email')
  const otp = localStorage.getItem('reset_otp')

  if (!email || !otp) {
      alert('Missing information. Please restart the process.')
      router.push('/forgotaccount')
      return
  }

  if (password.value !== password_confirmation.value) {
      alert('Passwords do not match!')
      return
  }

  try {
    console.log('Resetting password with:', { email, otp })
    await authStore.resetPassword({
        email,
        otp,
        password: password.value,
        password_confirmation: password_confirmation.value
    })
    alert('Password updated successfully! Please login.')
    // clear storage
    localStorage.removeItem('reset_email')
    localStorage.removeItem('reset_otp')
    router.push('/login')
  } catch (err: any) {
    console.error('Password reset error:', err)
    const errorMessage = err.response?.data?.message || 'Failed to update password.'
    alert(errorMessage)
  }
}
</script>
<style scoped>
</style>