<script setup>
  import NavigationLink from '../components/NavigationLink.vue';
</script>

<template>
  <section class="admin-page">
  <aside class="sidebar">
    <NavigationLink :to="'/admin/metrics'">Метрики</NavigationLink>
    <NavigationLink :to="'/admin/create-metric'">Создать метрику</NavigationLink>
  </aside>
    <RouterView/>
  </section>
</template>

<style scoped>
  .admin-page {
    display: flex;
    gap: 20px;
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    flex: 150px 0 0;
  }
</style>