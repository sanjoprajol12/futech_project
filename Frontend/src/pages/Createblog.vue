<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-900 p-6">
    <div class="bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-sm">
      <h2 class="text-2xl font-bold text-white mb-4">Create New Blog</h2>
      <form @submit.prevent="submitBlog" class="space-y-4">
        <label class="text-white block">Title</label>
        <input
          v-model="title"
          type="text"
          placeholder="Blog Title"
          class="rounded-lg w-full text-white h-10 border-white p-2 rounded text-black"
          required
        />
        <label class="text-white block">Content</label>
        <textarea
          v-model="content"
          placeholder="Content"
          class="rounded-lg w-full h-60 text-white h-10 border-white p-2 rounded text-black"
          rows="6"
          required
        ></textarea>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Publish
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'

const title = ref('')
const content = ref('')
const router = useRouter()

const submitBlog = async () => {
  try {
      console.log('Creating blog with:', { title: title.value, content: content.value })
      
      // Send as JSON, not FormData
      await api.post('/blogs', {
        title: title.value,
        content: content.value
      })
      
      alert('Blog created successfully!')
      router.push('/blog')
  } catch (e: any) {
      console.error('Blog creation error:', e)
      console.error('Error response:', e.response?.data)
      
      let errorMsg = 'Failed to create blog.'
      
      if (e.response?.data?.message) {
          errorMsg += '\n' + e.response.data.message
      } else if (e.response?.data?.errors) {
          errorMsg += '\n' + JSON.stringify(e.response.data.errors, null, 2)
      } else if (e.message) {
          errorMsg += '\n' + e.message
      }
      
      alert(errorMsg)
  }
}
</script>
