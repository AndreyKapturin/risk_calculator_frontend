<script setup>
  defineProps(['to']);
</script>

<template>
  <RouterLink class="navigation-link" :to="to"><slot/></RouterLink>
</template>

<style scoped>
  .navigation-link {
    text-decoration: none;
    color: var(--text-color);
    padding: 10px;
    border-radius: var(--border-radius);
    background-color: var(--primary-color);
  }
  .navigation-link:hover,
  .navigation-link.router-link-active {
    background-color: var(--secondary-color);
  }
</style>