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
          By {{ getAuthorName }} • {{ formattedDate }}
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

onMounted(async () => {
  const id = Number(route.params.id)
  try {
    const foundBlog = await getBlogById(id)
    console.log('Blog detail fetched:', foundBlog)

    if (!foundBlog) {
        error.value = 'Blog not found'
    } else {
        blog.value = foundBlog
    }
  } catch (e: any) {
      console.error('Error fetching blog:', e)
      error.value = 'Error loading blog: ' + (e.response?.data?.message || e.message)
  }

  loading.value = false
})

const formattedDate = computed(() => {
  if (!blog.value?.created_at) return ''
  try {
    return new Date(blog.value.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return ''
  }
})

// Get author name from author object or string
const getAuthorName = computed(() => {
  if (!blog.value?.author) return 'Anonymous'
  const author = blog.value.author
  if (typeof author === 'string') return author
  if (typeof author === 'object') return author.name || author.email || 'Anonymous'
  return 'Anonymous'
})
</script>
