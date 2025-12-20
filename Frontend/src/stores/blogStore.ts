import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getBlogs, createBlog as serviceCreate, updateBlog as serviceUpdate, deleteBlog as serviceDelete } from '@/service/BlogService'
import type { Blog } from '@/type/type'

export const useBlogStore = defineStore('blog', () => {
  const blogs = ref<Blog[]>([])

  const fetchBlogs = async () => {
    blogs.value = await getBlogs()
  }

  const addBlog = async (blog: FormData) => {
    await serviceCreate(blog)
    await fetchBlogs()
  }

  const updateBlog = async (id: number, blog: FormData) => {
    await serviceUpdate(id, blog)
    await fetchBlogs()
  }

  const deleteBlog = async (id: number) => {
    await serviceDelete(id)
    await fetchBlogs()
  }

  // Note: getBlogsByUser was filtering locally. New API `userBlogs` exists.
  // Using local filter for now on fetched data if needed, or implement specific action.

  return { blogs, fetchBlogs, addBlog, updateBlog, deleteBlog }
})