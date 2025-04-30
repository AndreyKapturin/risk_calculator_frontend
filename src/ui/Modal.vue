<script setup>
  import { ref, watch } from 'vue';

  const dialog = ref(null);
  const props = defineProps(['isOpenModal']);  
  const emit = defineEmits(['closeModal']);

  watch(() => props.isOpenModal, (isOpenModal) => {
    if (isOpenModal) {
      dialog.value.showModal();
    } else {
      dialog.value.close();
    }
  })
</script>

<template>
  <dialog ref="dialog" @close="emit('closeModal')" @click.self="emit('closeModal')">
    <div class="dialog__header">
    </div>
    <div class="modal-content">
      <slot />
      <div class="modal-actions">
      </div>
    </div>
  </dialog>
</template>

<style scoped>
  dialog {
    transform: translate(-50%, -50%);
    border-radius: var(--border-radius);
    padding: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
  }
  .dialog__header {
    display: flex;
    justify-content: end;
    margin-bottom: 10px;
  }
  .modal-content {
    border-radius: var(--border-radius);
    min-width: 200px;
  }
</style>