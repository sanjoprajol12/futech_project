<<template>
  <div class="blog-card">
    <h3 class="blog-title">{{ blog.title }}</h3>
    <p class="author">
      By {{ getAuthorName(blog.author) }} 
      <span v-if="blog.created_at"> | {{ formatDate(blog.created_at) }}</span>
    </p>
    <p class="content">{{ truncateContent(blog.content) }}</p>
    <router-link :to="`/blog/${blog.id}`" class="read-more">Read More →</router-link>
  </div>
</template>

<script setup lang="ts">
interface Blog {
  id: number
  title: string
  content: string
  author?: string
  created_at?: string
}

const props = defineProps<{
  blog: Blog
}>()

// Get author name from author object or string
const getAuthorName = (author: any): string => {
  if (!author) return 'Anonymous'
  if (typeof author === 'string') return author
  if (typeof author === 'object') return author.name || author.email || 'Anonymous'
  return 'Anonymous'
}

// Truncate content to show snippet
const truncateContent = (content: string) => {
  const maxLength = 150
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + '...'
  }
  return content
}

// Format date to readable format
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}
</script>

<style scoped>
.blog-card {
  background: #27272a;
  border: 1px solid #3f3f46;
  padding: 20px;
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border-color: #3b82f6;
}

.blog-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8px;
}

.author {
  font-size: 0.875rem;
  color: #a1a1aa;
  margin-bottom: 12px;
}

.content {
  color: #d4d4d8;
  margin: 12px 0;
  line-height: 1.6;
}

.read-more {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  margin-top: 8px;
}

.read-more:hover {
  color: #60a5fa;
  text-decoration: underline;
}
</style>
>