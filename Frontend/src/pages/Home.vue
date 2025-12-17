<template>
  <div class="min-h-screen bg-zinc-900">
    
    
    <div class="max-w-4xl mx-auto px-6 py-16 text-center">
      <h1 class="text-5xl font-bold text-white mb-4">Welcome to MyBlog</h1>
      <p class="text-xl text-zinc-400 mb-12">
        Share your thoughts, ideas, and stories with the world
      </p>

      <!-- Quick Actions -->
      <div class="flex flex-wrap justify-center gap-4">
        <router-link 
          to="/blog" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          View All Blogs
        </router-link>
        
        <router-link 
          to="/createblog" 
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Create New Blog
        </router-link>
      </div>

     
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>
