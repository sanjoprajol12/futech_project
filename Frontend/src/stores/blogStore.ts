import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Blog {
  id: number
  title: string
  content: string
  snippet: string
  author: string
  date: string
  image?: string
}

export const useBlogStore = defineStore('blog', () => {
  const blogs = ref<Blog[]>([])

  const addBlog = (blog: Omit<Blog, 'id' | 'date' | 'snippet'>) => {
    const id = blogs.value.length + 1
    const date = new Date().toISOString().split('T')[0]
    const snippet = blog.content.substring(0, 100) + '...'
    blogs.value.push({ id, date, snippet, ...blog })
  }

  const updateBlog = (id: number, updatedBlog: Partial<Blog>) => {
    const index = blogs.value.findIndex(b => b.id === id)
    if (index !== -1) {
      blogs.value[index] = { ...blogs.value[index], ...updatedBlog }
      blogs.value[index].snippet = blogs.value[index].content.substring(0, 100) + '...'
    }
  }

  const deleteBlog = (id: number) => {
    blogs.value = blogs.value.filter(b => b.id !== id)
  }

  const getBlogsByUser = (author: string) => {
    return blogs.value.filter(b => b.author === author)
  }

  return { blogs, addBlog, updateBlog, deleteBlog, getBlogsByUser }
})