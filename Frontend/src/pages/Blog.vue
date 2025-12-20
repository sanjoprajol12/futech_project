<template>
  <div class="min-h-screen bg-zinc-900 p-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl font-bold text-white mb-8 text-center">All Blogs</h2>

      <!-- Loading State -->
      <div v-if="loading" class="text-center text-white text-xl">
        Loading blogs...
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-600 text-white p-4 rounded-lg text-center">
        {{ error }}
      </div>

      <!-- Empty State -->
      <div v-else-if="blogs.length === 0" class="text-center text-zinc-400 text-xl">
        No blogs found. Be the first to create one!
      </div>

      <!-- Blogs Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard
          v-for="blog in blogs"
          :key="blog.id"
          :blog="blog"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBlogs } from '@/service/BlogService'
import { ref, onMounted } from 'vue'
import BlogCard from '@/components/BlogCard.vue'
import type { Blog } from '@/type/type'

const blogs = ref<Blog[]>([])
const loading = ref(false)
const error = ref('')

const fetchBlogs = async () => {
  loading.value = true
  error.value = ''

  try {
    const fetchedBlogs = await getBlogs()
    
    // Ensure we have an array
    if (!Array.isArray(fetchedBlogs)) {
      console.error('API did not return an array:', fetchedBlogs)
      blogs.value = []
      error.value = 'Invalid response format from server'
      return
    }
    
    blogs.value = fetchedBlogs.map((blog: any) => ({
      ...blog,
      content: blog.content || blog.snippet || ''
    }))
  } catch (err: any) {
    console.error('Failed to load blogs:', err)
    if (err.response?.data?.message) {
        error.value = err.response.data.message
    } else if (err.message) {
        error.value = err.message
    } else {
        error.value = 'Failed to load blogs. Please check if the backend is running.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchBlogs())

</script>
