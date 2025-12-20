import type { Blog } from "@/type/type"
import api from '@/api'

// Get all blogs
export const getBlogs = async (): Promise<Blog[]> => {
  const res = await api.get('/blogs')
  console.log('Full blogs API response:', res.data)

  // Backend returns: { success: true, data: { data: [...], meta: {}, links: {} } }
  if (res.data.success && res.data.data?.data && Array.isArray(res.data.data.data)) {
    console.log('Using res.data.data.data (success wrapper + pagination)')
    return res.data.data.data
  }
  // Fallback: { data: { data: [...] } }
  else if (res.data.data?.data && Array.isArray(res.data.data.data)) {
    console.log('Using res.data.data.data (paginated)')
    return res.data.data.data
  }
  // Fallback: { data: [...] }
  else if (res.data.data && Array.isArray(res.data.data)) {
    console.log('Using res.data.data')
    return res.data.data
  }
  // Fallback: direct array
  else if (Array.isArray(res.data)) {
    console.log('Using res.data (direct array)')
    return res.data
  }

  console.error('Unexpected API response format:', res.data)
  return []
}

// Create a new blog
export const createBlog = async (blog: FormData): Promise<void> => {
  await api.post('/blogs', blog, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// Update blog
export const updateBlog = async (id: number, blog: FormData) => {
  // Use POST with _method=PUT or just PUT if no files, but FormData suggests files.
  // Laravel sometimes needs POST with _method='PUT' for file uploads.
  // If no image update, PUT is fine.
  // Let's assume standard PUT for now, or check if image handling required special treatment.
  // For FormData with files in Laravel, typically use POST + _method: PUT
  blog.append('_method', 'PUT');
  await api.post(`/blogs/${id}`, blog, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// Delete blog
export const deleteBlog = async (id: number) => {
  await api.delete(`/blogs/${id}`)
}

export const getBlogById = async (id: number): Promise<Blog | null> => {
  try {
    const res = await api.get(`/blogs/${id}`)
    console.log('getBlogById response:', res.data)

    // Handle { success: true, data: {...} } or { data: {...} }
    if (res.data.success && res.data.data) {
      return res.data.data
    } else if (res.data.data) {
      return res.data.data
    } else if (res.data.id) {
      return res.data
    }

    return null
  } catch (e) {
    console.error('Error fetching blog by ID:', e)
    return null
  }
}
