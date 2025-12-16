<template>
  <div class="blog-card">
    <img v-if="blog.image" :src="blog.image" alt="Blog Image" class="blog-img" />
    <h3>{{ blog.title }}</h3>
    <p class="author">By {{ blog.author }} | {{ blog.date }}</p>
    <p class="snippet">{{ blog.snippet }}</p>
    <router-link :to="`/blog/${blog.id}`" class="read-more">Read More</router-link>
  </div>
</template>

<script setup lang="ts">
interface Blog {
  id: number
  title: string
  author: string
  date: string
  snippet: string
  image?: string
}

const props = defineProps<{
  blog: Blog
}>()
</script>

<style scoped>
.blog-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  background: #fff;
}
.blog-img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 6px;
}
.author {
  font-size: 0.9rem;
  color: #555;
}
.snippet {
  margin: 10px 0;
}
.read-more {
  color: #1e40af;
  text-decoration: none;
  font-weight: bold;
}
.read-more:hover {
  text-decoration: underline;
}
</style>
