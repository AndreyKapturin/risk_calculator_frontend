<script setup>
  const props = defineProps(['question']);
  const emit = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div class="confirmation-window">
    <p>{{ question }}</p>
    <div class="control-buttons">
      <Button @click="emit('confirm')">Подтвердить</Button>
      <Button @click="emit('cancel')">Отменить</Button>
    </div>
  </div>
</template>

<style scoped>
  .confirmation-window {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .control-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>