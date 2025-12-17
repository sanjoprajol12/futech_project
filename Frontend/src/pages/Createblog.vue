<template>
  <div class="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
    <div class="bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-2xl">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">Create New Blog</h2>
      
      <!-- Success Message -->
      <div v-if="successMessage" class="bg-green-600 text-white p-4 rounded-lg mb-6">
        {{ successMessage }}
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="bg-red-600 text-white p-4 rounded-lg mb-6">
        {{ errorMessage }}
      </div>
      
      <form @submit.prevent="createBlog" class="space-y-6">
        <div>
          <label class="block text-zinc-300 text-sm font-medium mb-2">Blog Title</label>
          <input 
            type="text" 
            v-model="blog.title" 
            placeholder="Enter blog title" 
            required
            :disabled="loading"
            class="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-zinc-300 text-sm font-medium mb-2">Blog Content</label>
          <textarea 
            v-model="blog.content" 
            placeholder="Write your content here..." 
            required
            rows="10"
            :disabled="loading"
            class="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg cursor-pointer transition-colors"
        >
          {{ loading ? 'Publishing...' : 'Publish Blog' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'

const router = useRouter()

const blog = reactive({
    title: '',
    content: ''
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const createBlog = async () => {
    loading.value = true
    successMessage.value = ''
    errorMessage.value = ''

    try {
        // Post blog to backend API
        const response = await api.post('/blogs', {
            title: blog.title,
            content: blog.content
        })

        successMessage.value = 'Blog published successfully! Redirecting...'
        
        // Reset form
        blog.title = ''
        blog.content = ''

        // Redirect to blogs page after 2 seconds
        setTimeout(() => {
            router.push('/blogs')
        }, 2000)

    } catch (error: any) {
        errorMessage.value = error.response?.data?.message || 'Failed to create blog. Please try again.'
        console.error('Error creating blog:', error)
    } finally {
        loading.value = false
    }
}
</script>