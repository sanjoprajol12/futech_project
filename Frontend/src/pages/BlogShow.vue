<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-4 text-white">{{ blog.title }}</h1>
      <p class="text-gray-300 mb-6">By {{ blog.author || 'Anonymous' }} on {{ formattedDate }}</p>
      <div class="prose prose-invert max-w-none" v-html="blog.content"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
interface Blog {
  id: number
  title: string
  content: string
  author?: string
  created_at?: string
} 
const props = defineProps<{
  blog: Blog
}>()
const formattedDate = computed(() => {
  if (props.blog.created_at) {
    const date = new Date(props.blog.created_at)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
  return 'Unknown Date'
})
</script>