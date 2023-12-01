<template>
    <div class="page-footer">
        <span 
            class="app-version" 
            v-if="apiVersion">
            API Version: {{ apiVersion }}
        </span>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import HttpRequest from'../../services/HttpRequest';

const apiVersion = ref(null);

const fetchVersion = async () => {

  try {
    const response = await HttpRequest.get('version');
    const {success, version} = response.data;
    if (success) {
        apiVersion.value = version;
    }
  } catch (error) {
    console.error('Error fetching api version:', error);
  }

};

onMounted(() => {
  fetchVersion(); 
});

</script>

