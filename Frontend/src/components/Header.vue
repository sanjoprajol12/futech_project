<template>
  <header class="header">
    <div class="container">
      <router-link to="/" class="logo text-white no-underline">MyBlog</router-link>
      <nav>
        <ul class="nav-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/blog">Blogs</router-link></li>
          
          <template v-if="!isLoggedIn">
            <li><router-link to="/login">Login</router-link></li>
            <li><router-link to="/register">Register</router-link></li>
          </template>
          
          <template v-else>
            <li><router-link to="/createblog">Create Blog</router-link></li>
            <li><router-link to="/profile">Profile</router-link></li>
            <li>
              <button @click="handleLogout" class="logout-btn">Logout</button>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()
const { token } = storeToRefs(authStore)

const isLoggedIn = computed(() => !!token.value || !!localStorage.getItem('auth_token'))

onMounted(async () => {
  if (!token.value && localStorage.getItem('auth_token')) {
    authStore.token = localStorage.getItem('auth_token') || ''
    await authStore.fetchUser()
  }
})

const handleLogout = () => {
  localStorage.removeItem('auth_token')
  authStore.token = ''
  authStore.user = null
  router.push('/login')
}
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
.logout-btn {
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.logout-btn:hover {
  background: white;
  color: #003cff;
}
.no-underline {
  text-decoration: none;
}
</style>
