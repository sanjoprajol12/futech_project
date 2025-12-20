<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-900 p-4">

    <div class="bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-md">

      <h2 class="text-3xl font-bold text-white mb-8 text-center">Create Your Account</h2>

      <form @submit.prevent="register" class="space-y-6">

        <div>
          <label class="text-white ">Name</label><br></br>
          <input type="text" id="name" v-model="user.name" required
            class=" rounded-lg w-full text-white h-10 border border-white " />
        </div>
        

        <div>
          <label style="color: white;">Email</label><br></br>
          <input type="email" id="email" v-model="user.email" required class=" rounded-lg w-full text-white h-10 " />
        </div>

        <div>
          <label style="color: white;">Password</label><br></br>
          <input type="password" id="password" v-model="user.password" required
            class="border-white rounded-lg w-full text-white h-10 " />
        </div>

        <div>
          <label style="color: white;">Confirm Password</label><br></br>
          <input type="password" id="password_confirmation" v-model="user.password_confirmation" required
            class="border-white rounded-lg w-full text-white h-10 " />
        </div>

        <div>
          <button type="submit" class="boarder-solid bg-white text-black pa-3 rounded-lg w-full cursor-pointer">
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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = reactive({
  name: '',
  last_name: '', // Added last_name as per store interface
  email: '',
  password: '',
  password_confirmation: ''
})

const register = async () => {
  try {
    await authStore.register({
      name: user.name, // Sending 'name' as primary field
      first_name: user.name, // Sending 'first_name' just in case backend uses it
      last_name: user.last_name || '', 
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    })
    // Save email for OTP step
    localStorage.setItem('registration_email', user.email)
    alert('Registration successful! Please check your email/OTP.')
    router.push('/two_factor')
  } catch (err: any) {
    console.error(err)
    // Extract validation errors
    let msg = 'Registration failed.'
    if (err.response?.data?.errors) {
        msg += '\n' + JSON.stringify(err.response.data.errors, null, 2)
    } else if (err.response?.data?.message) {
        msg += '\n' + err.response.data.message
    }
    alert(msg)
  }
}
</script>