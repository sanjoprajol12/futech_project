<template>
  <div v-if="open" class="overlay">
    <div class="modal">
      <h2>Edit Profile</h2>

      <form @submit.prevent="submit">
        <label for="name">Name</label><br><br>
        <input v-model="form.name" type="text" placeholder="Name" /><br><br>
        <label for="password">Change Password</label><br><br>
        <input v-model="form.password" type="password" placeholder="Password" />

        <div class="actions">
          <button type="submit">Save</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps<{
  open: boolean
  user: {
    first_name: string
    last_name: string
    email: string
  }
}>()

const emit = defineEmits(['save', 'close'])

const form = reactive({
  name: '',
  password: ''
})

watch(
  () => props.user,
  (u) => {
    form.name = u.first_name
    form.password = u.last_name
    
  },
  { immediate: true }
)

const submit = () => {
  emit('save', { ...form })
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 20px;
  width: 350px;
  border-radius: 8px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
