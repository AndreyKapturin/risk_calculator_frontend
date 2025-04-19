<script setup>
  const props = defineProps(['objectsGroup']);
</script>

<template>
  <RouterLink class="objects-group-card" :to="'/objects-groups/' + objectsGroup.id" >{{objectsGroup.name}}</RouterLink>
</template>

<style>
  .objects-group-card {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
    background-color: var(--primary-color);
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;
    min-height: 120px;
  }

  .objects-group-card:hover {
    background-color: var(--secondary-color);
  }
</style>