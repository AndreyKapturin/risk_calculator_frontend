<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <Header />
  <main class="content">
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped>
</style>
