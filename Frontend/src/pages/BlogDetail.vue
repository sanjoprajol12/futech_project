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
          class="prose prose-invert max-w-none"
          v-html="blog.content"
        ></div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api'

interface Blog {
  id: number
  title: string
  content: string
  author?: string
  created_at?: string
}

const route = useRoute()
const blog = ref<Blog | null>(null)
const loading = ref(false)
const error = ref('')

const fetchBlog = async () => {
  loading.value = true
  try {
    const response = await api.get(`/blogs/${route.params.id}`)
    blog.value = {
      id: response.data.data.id,
      title: response.data.data.title,
      content: response.data.data.content,
      author: response.data.data.author?.name,
      created_at: response.data.data.created_at,
    }
  } catch (err: any) {
    error.value = 'Failed to load blog'
  } finally {
    loading.value = false
  }
}

const formattedDate = computed(() => {
  if (!blog.value?.created_at) return ''
  return new Date(blog.value.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

onMounted(fetchBlog)
</script>
