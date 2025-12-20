<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" v-if="open" @click.self="$emit('close')">
    <div class="bg-zinc-800 rounded-xl p-8 w-full max-w-md shadow-2xl">
      <h2 class="text-2xl font-bold text-white mb-6">Change Password</h2>
      
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white mb-2">Current Password</label>
          <input
            v-model="form.current_password"
            type="password"
            class="w-full px-4 py-2 bg-zinc-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white mb-2">New Password</label>
          <input
            v-model="form.new_password"
            type="password"
            class="w-full px-4 py-2 bg-zinc-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white mb-2">Confirm New Password</label>
          <input
            v-model="form.new_password_confirmation"
            type="password"
            class="w-full px-4 py-2 bg-zinc-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div class="flex gap-3 pt-4">
          <button
            type="submit"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Change Password
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  save: [data: { current_password: string; new_password: string; new_password_confirmation: string }]
}>()

const form = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
})

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    // Reset form when modal opens
    form.value = {
      current_password: '',
      new_password: '',
      new_password_confirmation: ''
    }
  }
})

const submit = () => {
  if (form.value.new_password !== form.value.new_password_confirmation) {
    alert('New passwords do not match!')
    return
  }
  
  emit('save', form.value)
}
</script>
