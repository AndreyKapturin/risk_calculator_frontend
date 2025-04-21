<script setup>
  const model = defineModel();
</script>
  
<template>
  <textarea v-model="model"></textarea>
</template>

<style scoped>
 textarea {
  resize: vertical;
  border-radius: var(--border-radius);
  padding: 5px 10px;
}
</style>