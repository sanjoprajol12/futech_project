
<template>

  <div >
    <div >
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label> Username or Email</label>
                <input v-model="email" placeholder="Username or Email" />
            </div>
            <div class="form-group">
                <label> Password</label>
                <input v-model="password" type="password" placeholder="Password" />
            </div>
            <button type="submit" class="btn-primary">Login</button>
            <div>
                <p>Don't have an account?</p>
                <router-link to="/register">Register</router-link>
            </div>

        </form>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const login = () => {
  alert(`Email: ${email.value}\nPassword: ${password.value}`)
}
</script>
<style>
  
</style>
