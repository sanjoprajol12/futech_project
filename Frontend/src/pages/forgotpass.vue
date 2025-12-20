<template>
   <div class="min-h-screen flex items-center justify-center bg-zinc-900 p-4">

    <div class="bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-md">
            <h1 class="text-3xl font-bold text-white mb-8 text-center">Two Factor Authentication</h1>
            <form @submit.prevent="submit">
                <label for="code" class="text-white text-2xl">Verification Code</label>
                <input class="rounded-lg w-full text-white h-10 border-white" type="text" id="code" v-model="code" required>
                <button class="boarder-solid bg-white text-black pa-3 rounded-lg w-full cursor-pointer" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const code = ref('')

const submit = () => {
    // We just save the code and move to password reset page
    // The final Atomic Reset request will verify everything.
    if (!code.value) {
        alert('Please enter the code')
        return
    }
    localStorage.setItem('reset_otp', code.value)
    router.push('/updatepassword')
}
</script>
<style scoped>
</style>
