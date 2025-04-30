<script setup>
  import { computed, ref } from 'vue';
  import { updateMetricIndicatorText, deleteIndicator } from '../api.js';
  import Modal from '../ui/Modal.vue';
  import Confirmation from '../ui/Confirmation.vue';
  import { toast } from 'vue3-toastify';

  const props = defineProps(['indicator', 'index', 'isEditMode']);
  const emit = defineEmits(['updateIndicatorText', 'deleteIndicator']);

  const indicatorText = ref(props.indicator.text);
  const isEdited = computed(() => props.indicator.text !== indicatorText.value);
  const isOpenModal = ref(false);

  const saveChanges = async () => {
    const updatedIndicator = await updateMetricIndicatorText(props.indicator.id, { text: indicatorText.value });
    emit('updateIndicatorText', updatedIndicator);
  }

  const handleDeleteIndicator = async () => {
    try {
      const deletedIndicator = await deleteIndicator(props.indicator.id);
      emit('deleteIndicator', deletedIndicator);
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  }
</script>

<template>
  <div class="metric-indicator">
    <template v-if="isEditMode">
      <Input  v-model="indicatorText" />
      <div class="control-buttons">
        <Button :disabled="!isEdited" @click="saveChanges">Сохранить</Button>
        <Button v-if="index > 1" @click="isOpenModal=true">Удалить</Button>
      </div>
    </template>
    <p v-else>{{ indicator.text }}</p>
  </div>
  <Modal :isOpenModal @closeModal="isOpenModal=false">
    <Confirmation
      question="Индикатор будет удален вместе со всеми значениями для каждой группы объектов. Продолжить?"
      @confirm="handleDeleteIndicator"
      @cancel="isOpenModal=false"
    />
  </Modal>
</template>

<style scoped>
  .metric-indicator {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    column-gap: 10px;
  }

  .control-buttons {
    display: flex;
    gap: 10px;
  }
</style>