<template>
  <div>
    <form  @submit.prevent="register">
      <input type="text" v-model="user.name" placeholder="First Name" required />
      <input type="text" v-model="user.last_name" placeholder="Last Name" required />
      <input type="email" v-model="user.email" placeholder="Email" required />
      <input type="password" v-model="user.password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
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
