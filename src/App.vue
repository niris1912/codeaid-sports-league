<template>
  
  <AppHeader />
  <div class="container">
    <div class="content">
      <RouterView />
    </div>
  </div>
  <AppFooter />
  
</template>

<script setup>
import AppHeader from './components/base/AppHeader.vue';
import AppFooter from './components/base/AppFooter.vue';
</script>

<style>
@import "./index.css";
</style>