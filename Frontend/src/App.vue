<template>
  <Header />
  <main style="padding-bottom: 60px;">
    <router-view />
  </main>
  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
