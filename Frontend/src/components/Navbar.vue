<template>
    <v-app>
  <v-app-bar>
    <v-toolbar-title>My Blog</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn text @click="$router.push('/Home')">Home</v-btn>
    <v-btn text @click="$router.push('/Createblog')">Create Blog</v-btn>
    <v-btn text @click="$router.push('/Login')">Login</v-btn>
    <v-btn text @click="$router.push('/Register')">Register</v-btn>
    <v-btn text @click="$router.push('/Profile')">Profile</v-btn>
  

    <v-btn text color="red" @click="logout">Logout</v-btn>
  </v-app-bar>
  </v-app>
</template>

<script setup lang="ts">
const logout = () => {
  localStorage.removeItem('currentUser')
  // redirect to login page
  window.location.href = '/login'
}
</script>
