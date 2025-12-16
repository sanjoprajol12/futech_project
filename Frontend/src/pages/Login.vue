<template>
  <div class="main">
    <div class="form">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label>Email</label><br>
          <input type="email" v-model="email" placeholder="Email" required />
        </div>

        <div class="form-group">
          <label>Password</label><br>
          <input type="password" v-model="password" placeholder="Password" required />
        </div>

        <button type="submit" class="btn-primary">Login</button>

        <div>
          <p></p>
          <router-link to="/register">Don't have an account?</router-link>
          <router-link to="/forgotaccount">Forgot Account?</router-link>
        </div>
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
const password = ref('')

const login = async () => {
  try {
    const res = await api.post('/Login', { email: email.value, password: password.value })
    localStorage.setItem('token', res.data.token)
    alert(res.data.message)
    router.push('/Profile')
  } catch (err: any) {
    alert(err.response?.data?.error || 'Login failed')
  }
}
</script>


<style scoped>
/* Add your form styles here */
</style>
