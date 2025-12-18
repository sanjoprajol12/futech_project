<template>
  <header class="header">
    <div class="container">
      <h1 class="logo">MyBlog</h1>
      <nav>
        <ul class="nav-links">
          <li><router-link to="/">Home</router-link></li>
          
          <li><router-link to="/blog">Blogs</router-link></li>
          <li><router-link to="/login">login</router-link></li>
          <li><router-link to="/register">Register</router-link></li>
          <li><router-link to="/createblog">Create Blog</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
          
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// No logic needed for a static header
</script>

<style scoped>
.header {
  background-color: #003cff;
  color: white;
  padding: 10px 0;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
}
.logo {
  font-size: 24px;
  font-weight: bold;
}
.nav-links {
  display: flex;
  list-style: none;
  gap: 15px;
}
.nav-links li a {
  color: white;
  text-decoration: none;
}
.nav-links li a:hover {
  text-decoration: underline;
}
</style>
