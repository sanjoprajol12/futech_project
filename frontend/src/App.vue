
<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from './axios';

export default defineComponent({
  name: 'App',
  data() {
    return {
      message: '',
    };
  },
  mounted() {
    // Make a GET request to your Laravel API
    api.get('/example')  // Adjust the endpoint according to your Laravel route
      .then((response) => {
        this.message = response.data.message;
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  },
});
</script>
