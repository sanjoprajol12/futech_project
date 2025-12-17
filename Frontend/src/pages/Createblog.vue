<template>
  <div class="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
    <div class="bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-2xl">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">Create New Blog</h2>
      
      <form @submit.prevent="createBlog" class="space-y-6">
        <div>
          <label class="block text-zinc-300 text-sm font-medium mb-2">Blog Title</label>
          <input 
            type="text" 
            v-model="blog.title" 
            placeholder="Enter blog title" 
            required
            class="w-full h-10 rounded-lg text-3xl text-zinc-200"
          />
        </div>

        <div>
          <label class="block text-zinc-300 text-sm font-medium mb-2">Blog Content</label>
          <textarea 
            v-model="blog.content" 
            placeholder="Write your content here..." 
            required
            rows="6"
            class="w-full h-60 rounded-lg text-3xl text-zinc-200"
          ></textarea>
        </div>

        <button 
          type="submit" 
          class="w-full text-white font-bold py-3 px-4 rounded-lg cursor-pointer"
        >
          Publish Blog
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const blog = reactive({
    title: '',
    content: '',
    image: null as File | null
})

const onImageChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files && target.files[0]) {
        blog.image = target.files[0]
    }
}

const createBlog = () => {
    console.log(blog)
    alert(`Blog Title: ${blog.title}\nBlog Content: ${blog.content}`)
}
</script>