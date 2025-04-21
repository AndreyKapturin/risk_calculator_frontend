<script setup>
  const model = defineModel();
</script>

<template>
 <select v-model="model"><slot /></select>
</template>

<style scoped>
  select {
    border-radius: var(--border-radius);
    padding: 5px 10px;
    cursor: pointer;
    width: 100%;
  }
</style>