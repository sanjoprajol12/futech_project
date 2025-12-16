
<template>

  <div class ="main" >
    <div class="form">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label>Email</label><br>
                <input type="email" v-model="email" placeholder="Email" />
            </div>
            <div class="form-group">
                <label> Password</label><br></br>
                <input type="password" v-model="password" placeholder="Password" />
            </div>
            <button type="submit" class="btn-primary">Login</button>
            <div>
                <p></p>
                <router-link to="/register">on't have an account?</router-link>
                <router-link to="/forgotaccount">Forgot Account?</router-link>
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
