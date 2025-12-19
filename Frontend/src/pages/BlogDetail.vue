<template>
  <div class="min-h-screen bg-zinc-900 p-6">
    <div class="max-w-4xl mx-auto">

      <!-- Loading -->
      <p v-if="loading" class="text-white text-center text-xl">
        Loading blog...
      </p>

      <!-- Error -->
      <p v-else-if="error" class="bg-red-600 text-white p-4 rounded text-center">
        {{ error }}
      </p>

      <!-- Blog Content -->
      <div v-else-if="blog" class="bg-zinc-800 p-6 rounded-lg shadow">
        <h1 class="text-3xl font-bold text-white mb-2">
          {{ blog.title }}
        </h1>

        <p class="text-zinc-400 mb-6">
          By {{ blog.author || 'Anonymous' }} • {{ formattedDate }}
        </p>

        <div
          class="text-white prose prose-invert max-w-none"
          v-html="blog.content"
        ></div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogById } from '@/service/BlogService'

interface Blog {
  id: number
  title: string
  content: string
  author?: string
  date?: string
}

const route = useRoute()
const blog = ref<Blog | null>(null)
const loading = ref(true)
const error = ref('')

onMounted(() => {
  const id = Number(route.params.id)
  const foundBlog = getBlogById(id)

  if (!foundBlog) {
    error.value = 'Blog not found'
  } else {
    blog.value = foundBlog
  }

  loading.value = false
})

const formattedDate = computed(() => {
  if (!blog.value?.date) return ''
  return new Date(blog.value.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>
