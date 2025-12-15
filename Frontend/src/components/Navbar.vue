<template>
  <nav class="bg-indigo-600 text-white p-4 flex justify-between">
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/blogs" class="ml-4">Blogs</router-link>
    </div>
    <div>
      <router-link to="/login">Login</router-link>
      <router-link to="/register" class="ml-4">Register</router-link>
    </div>
  </nav>
</template>
