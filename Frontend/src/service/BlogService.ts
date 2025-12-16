import { Blog } from '@/types/types'

// Key for localStorage
const BLOGS_KEY = 'blogs'

// Get all blogs
export const getBlogs = (): Blog[] => {
  const blogs = localStorage.getItem(BLOGS_KEY)
  return blogs ? JSON.parse(blogs) : []
}

// Create a new blog
export const createBlog = (blog: Blog): void => {
  const blogs = getBlogs()
  const newBlog = {
    ...blog,
    id: Date.now(), // unique id
    comments: [],
    likes: 0
  }
  blogs.push(newBlog)
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs))
}

// Update blog
export const updateBlog = (updatedBlog: Blog & { id: number }) => {
  const blogs = getBlogs()
  const index = blogs.findIndex(b => b.id === updatedBlog.id)
  if (index !== -1) {
    blogs[index] = { ...blogs[index], ...updatedBlog }
    localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs))
  }
}

// Delete blog
export const deleteBlog = (id: number) => {
  const blogs = getBlogs().filter(b => b.id !== id)
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs))
}
