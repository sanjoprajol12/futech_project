<template>
    <v-app>
        <v-container>
            <h2>Create Blog</h2>
            <form @submit.prevent="createBlog">
                <div class="form-group">
                    <label>Blog Title</label>
                    <input type="text" v-model="blog.title" placeholder="Blog Title"  required/>
                </div>
                <div class="form-group">
                    <label>Blog Content</label>
                    <textarea v-model="blog.content" placeholder="Blog Content" required></textarea>
                </div>
                <div>
                    <lable>
                        Add Image
                    </lable><br>
                    <input type="file" @change="onImageChange" accept="image/*"/>
                 </div>
                <button type="submit" class="btn-primary">Create Blog</button>
            </form>
        </v-container>
    </v-app>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const blog = reactive({
    title: '',
    content: '',
    image: ''
})

const createBlog = () => {
    console.log(blog)
    alert(`Blog Title: ${blog.title}\nBlog Content: ${blog.content}`)
}
</script>