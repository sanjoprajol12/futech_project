<template>
  <div>
   

    <h2>Profile</h2>

    <div v-if="user">
      <img v-if="user.image" :src="user.image" alt="Profile Image" width="120" />
      <p>Email: {{ user.email }}</p>
      <p>First Name: {{ user.first_name }}</p>
      <p>Last Name: {{ user.last_name }}</p>

      <button @click="editProfile">Edit Profile</button>
    </div>

    <EditProfileModal
      :open="openModal"
      :user="user"
      @close="closeModal"
      @save="save"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import EditProfileModal from '@/components/EditProfileModal.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const openModal = ref(false)

const user = ref({
  email: '',
  first_name: '',
  last_name: '',
  image: ''
})

if (authStore.user) {
  user.value = authStore.user
}

const editProfile = () => {
  openModal.value = true
}

const closeModal = () => {
  openModal.value = false
}

const save = (updatedUser: typeof user.value) => {
  user.value = updatedUser
  openModal.value = false
}
</script>
