<script setup>
  const model = defineModel();
</script>

<template>
  <input v-model="model"/>
</template>

<style scoped>
  input {
    width: 100%;
    padding: 10px;
    border-radius: var(--border-radius);
    cursor: pointer;
    border: 1px solid black;
    outline: none;
  }
</style>