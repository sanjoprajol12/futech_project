<template>
  <div class="min-h-screen bg-zinc-900 p-4 md:p-8">
    
    <div class="max-w-4xl mx-auto">
      
      <h2 class="text-3xl font-bold text-white border-b border-zinc-700 pb-4 mb-8">Your Profile</h2>

      <div v-if="user" class="space-y-6">
        
        <!-- Profile Information Display -->
        <div class="bg-zinc-800 rounded-lg p-6">
          <h3 class="text-xl font-semibold text-white mb-4">Profile Information</h3>
          
          <div class="space-y-4">
            <div>
              <p class="text-sm font-medium text-zinc-400">Name</p>
              <p class="text-lg font-semibold text-white">{{ user.name }}</p>
            </div>

            <div>
              <p class="text-sm font-medium text-zinc-400">Email</p>
              <p class="text-lg font-semibold text-white">{{ user.email }}</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            @click="openUpdateProfile"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            Update Profile
          </button>
          
          <button 
            @click="openChangePassword"
            class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors"
          >
            Change Password
          </button>
          
          <button 
            @click="handleForgotPassword"
            class="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-semibold transition-colors"
          >
            Reset Password
          </button>
        </div>
      </div>
      
      <div v-else class="text-center py-10">
          <p class="text-gray-500">Loading user data...</p>
      </div>

    </div>

    <!-- Modals -->
    <UpdateProfileModal
      :open="showUpdateModal"
      :user="user"
      @close="showUpdateModal = false"
      @save="saveProfile"
    />
    
    <ChangePasswordModal
      :open="showPasswordModal"
      @close="showPasswordModal = false"
      @save="changePassword"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UpdateProfileModal from '@/components/UpdateProfileModal.vue'
import ChangePasswordModal from '@/components/ChangePasswordModal.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const showUpdateModal = ref(false)
const showPasswordModal = ref(false)

const user = ref({
  email: '',
  name: ''
})

onMounted(async () => {
    if (!authStore.user) {
        await authStore.fetchUser()
    }
    if (authStore.user) {
        syncUser()
    }
})

const syncUser = () => {
    if (authStore.user) {
        user.value = {
            email: authStore.user.email,
            name: authStore.user.name || authStore.user.first_name || ''
        }
    }
}

const openUpdateProfile = () => {
  showUpdateModal.value = true
}

const openChangePassword = () => {
  showPasswordModal.value = true
}

const handleForgotPassword = () => {
  // Save email for password reset flow
  localStorage.setItem('reset_email', user.value.email)
  router.push('/forgotaccount')
}

const saveProfile = async (updatedData: any) => {
  try {
      await authStore.updateProfile(updatedData)
      await authStore.fetchUser() // Refresh user data
      syncUser()
      showUpdateModal.value = false
      alert('Profile updated successfully!')
  } catch (e: any) {
      console.error('Profile update error:', e)
      alert('Failed to update profile: ' + (e.response?.data?.message || e.message))
  }
}

const changePassword = async (passwordData: any) => {
  try {
      await authStore.changePassword(passwordData)
      showPasswordModal.value = false
      alert('Password changed successfully!')
  } catch (e: any) {
      console.error('Password change error:', e)
      alert('Failed to change password: ' + (e.response?.data?.message || e.message))
  }
}
</script>