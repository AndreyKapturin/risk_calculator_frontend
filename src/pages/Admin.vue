<script setup></script>

<template>
  <section class="admin-page">
    <nav class="sidebar">
      <RouterLink to="/admin/metrics">Метрики</RouterLink>
      <RouterLink to="/admin/create-metric">Создать метрику</RouterLink>
    </nav>
    <RouterView />
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
  }
</style>