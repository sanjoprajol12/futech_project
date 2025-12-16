<template>
  <div>
    <h2>All Blogs</h2>
    <div v-if="blogs.length === 0">No blogs found.</div>

    <div v-else>
      <BlogCard
        v-for="blog in blogs"
        :key="blog.id"
        :blog="blog"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BlogCard from '@/components/BlogCard.vue'

// Sample blogs (later fetch from Laravel API)
const blogs = ref([
  {
    id: 1,
    title: 'My First Blog',
    author: 'Prajwol Sainju',
    date: '2025-12-16',
    snippet: 'This is a snippet of my first blog post...',
    image: ''
  },
  {
    id: 2,
    title: 'Vue 3 Tips',
    author: 'Prajwol Sainju',
    date: '2025-12-15',
    snippet: 'Here are some cool Vue 3 tips for beginners...',
    image: ''
  }
])

// Later: fetch from API
// onMounted(async () => {
//   const res = await axios.get('/api/blogs')
//   blogs.value = res.data
// })
</script>
