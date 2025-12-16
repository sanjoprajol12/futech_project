<template>
  <div class="main">
    <div class="form">
    <form  @submit.prevent="register">
      <div class="name">
      <label for="name">First Name</label><br>
      <input type="text" v-model="user.name" placeholder="First Name" required />
      <br>
      </div>
      <div class="last_name">
      <label for="last_name">Last Name</label><br>
      <input type="text" v-model="user.last_name" placeholder="Last Name" required />
      <br>
      </div>
      <label for="email">Email</label><br>
      <input type="email" v-model="user.email" placeholder="Email" required />
      <br>
      <label for="password">Password</label><br>
      <input type="password" v-model="user.password" placeholder="Password" required />
      <br>
      <button type="submit">Register</button>
      <p><a href="/Login">Already have an account?</a></p>
    </form>
  </div>  
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'

export default {
  setup() {
    const user = reactive({
      name: '',
      last_name: '',
      email: '',
      password: ''
    })

    const register = () => {
      console.log(user) // logs the user object
      alert(`Registered: ${user.name} ${user.last_name}`)
    }

    return { user, register }
  }
}
</script>
