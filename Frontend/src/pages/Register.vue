<template>
  <div class="main">
    <div class="form">
      <form @submit.prevent="register">
        <label>First Name</label><br>
        <input type="text" v-model="user.name" placeholder="Name" required /><br/>

        <label>Email</label><br>
        <input type="email" v-model="user.email" placeholder="Email" required /><br/>

        <label>Password</label><br>
        <input type="password" v-model="user.password" placeholder="Password" required /><br/>

        <label>Confirm Password</label><br>
        <input type="password" v-model="user.password_confirmation" placeholder="Confirm Password" required /><br/>

        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
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
    alert(res.data.message) // tells to verify email
    router.push('/Login')
  } catch (err: any) {
    alert(err.response?.data?.message || 'Registration failed')
  }
}
</script>
