<template>
  <div class="min-h-screen bg-zinc-900 flex items-center justify-center p-6 py-12">
    <div class="bg-zinc-800/80 backdrop-blur-md shadow-2xl rounded-3xl border border-zinc-700/50 p-8 w-full max-w-2xl transform transition-all duration-500 hover:shadow-blue-500/5">
      <!-- Back Header -->
      <div class="flex items-center justify-between mb-8">
        
      </div>

      <div class="text-center mb-10">
        <h2 class="text-4xl font-extrabold text-white mb-2 tracking-tight">Create Blog</h2>
        <p class="text-zinc-400">Share your thoughts with the community today.</p>
      </div>
      
      <!-- Messages -->
      

      
      
      <form @submit.prevent="createBlog" >
        <div class="group">
          <label class="block text-zinc-400 text-sm font-semibold mb-2 ml-1 transition-colors group-focus-within:text-blue-400">Blog Title</label>
          <input 
            type="text" 
            v-model="blog.title" 
            placeholder="Give your story a name" 
            required
            :disabled="loading"
            class="w-full px-5 py-3 rounded-2xl bg-zinc-900/50 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-600 shadow-inner"
          />
        </div>

        <div class="group">
          <label class="block text-zinc-400 text-sm font-semibold mb-2 ml-1 transition-colors group-focus-within:text-blue-400">Content</label>
          <textarea 
            v-model="blog.content" 
            placeholder="Once upon a time..." 
            required
            rows="10"
            :disabled="loading"
            class="w-full px-5 py-4 rounded-2xl bg-zinc-900/50 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-600 shadow-inner resize-none"
          ></textarea>
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full relative group/btn overflow-hidden bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
        >
          <span v-if="loading" class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
          <span>{{ loading ? 'Publishing...' : 'Publish Your Story' }}</span>
          <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transform transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
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

        successMessage.value = 'Your blog has been published! Redirecting to feed...'
        
        // Reset form
        blog.title = ''
        blog.content = ''

        // Redirect to blogs page after a short delay
        setTimeout(() => {
            router.push('/blog')
        }, 1500)

    } catch (error: any) {
        errorMessage.value = error.response?.data?.message || 'Failed to publish blog. Please check your connection and try again.'
        console.error('Error creating blog:', error)
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
/* Custom inner shadow for inputs to feel more premium */
.shadow-inner {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}
</style>