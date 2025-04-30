<script setup>
  defineProps(['to']);
</script>

<template>
  <RouterLink class="link" :to="to"><slot/></RouterLink>
</template>

<style scoped>
  .link {
    text-decoration: none;
    color: var(--primary-color);
  }
  .link:hover {
    color: var(--secondary-color);
  }
</style>