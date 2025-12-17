<template>
  <div class="min-h-screen bg-zinc-900 p-4 md:p-8">
    
    <div class="bg-zinc-900">
      
      <h2 class="text-3xl font-bold text-white border-b pb-4 mb-6">Your Profile</h2>

      <div v-if="user" class="space-y-4">
        
        

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div class="p-3 bg-zinc-800 rounded-lg">
                <p class="text-sm font-medium  text-white">Email</p>
                <p class="text-lg font-semibold text-white">{{ user.email }}</p>
            </div><br>

            <div class="p-3 bg-zinc-800 rounded-lg">
                <p class="text-sm font-medium text-white">First Name</p>
                <p class="text-lg text-white">{{ user.first_name }}</p>
            </div><br>
            <div class="p-3 bg-zinc-800 rounded-lg">
                <p class="text-sm font-medium text-white">Last Name</p>
                <p class="text-lg text-white">{{ user.last_name }}</p>
            </div><br>

            <div class="p-3 bg-zinc-800 rounded-lg md:col-span-1">
                <p class="text-sm font-medium text-white">Image</p>
                <p class="text-lg text-white">{{ user.image }}</p>
            </div><br>
            
            </div>

        <div class="pt-6 border-t mt-6">  
            <button 
                @click="editProfile"
                class="bg-blue-600 text-white  "
            >
                Edit Profile
            </button>
        </div>
      </div>
      
      <div v-else class="text-center py-10">
          <p class="text-gray-500">Loading user data...</p>
      </div>

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
// Script remains the same
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
  // Assume successful API call here to update authStore.user and state
  user.value = updatedUser
  openModal.value = false
}
</script>