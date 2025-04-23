<script setup>
  defineProps({
    disabled: {
      required: false,
      default: false
    }
  })
</script>

<template>
  <button :disabled><slot /></button>
</template>

<style scoped>
  button {
    padding: 10px 10px;
    border-radius: var(--border-radius);
    cursor: pointer;
    background-color: var(--primary-color);
    color: var(--text-color);
    border: none;
  }
  
  button:hover {
    background-color: var(--secondary-color);
  }
  button:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
</style>