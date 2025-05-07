<script setup>
  import NavigationLink from '../ui/NavigationLink.vue';
</script>

<template>
  <section class="not-found-page">
    <h1>Страница не найдена</h1>
    <NavigationLink to="/">На главную</NavigationLink>
  </section>
</template>

<style scoped>
  .not-found-page {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: start;
  }
</style>