<script setup>
import { ref } from 'vue';
import { updateMetricIndicatorText, deleteIndicator } from '../api.js';

const props = defineProps(['indicator']);
const emit = defineEmits(['updateIndicatorText', 'deleteIndicator']);

const isEditMode = ref(false);
const indicatorText = ref(props.indicator.text);

const setEditMode = () => {
  isEditMode.value = true;
}

const cancelEditMode = () => {
  isEditMode.value = false;
  indicatorText.value = props.indicator.text;
}

const saveChanges = async () => {
  const updatedIndicator = await updateMetricIndicatorText(props.indicator.id, { text: indicatorText.value });
  emit('updateIndicatorText', updatedIndicator);
  isEditMode.value = false;
}

const handleDelete = async () => {
  const isConfimed = confirm('Индикатор будет удалён из метрики для каждого объекта со всеми значениями. Продолжить?');
  if (isConfimed) {
    const deletedIndicator = await deleteIndicator(props.indicator.id);
    emit('deleteIndicator', deletedIndicator);
  }
}

</script>

<template>
  <div class="metric-indicator">
    <template  v-if="isEditMode">
      <input  v-model="indicatorText">
      <div class="control-buttons">
        <button @click="saveChanges">Сохранить</button>
        <button @click="cancelEditMode">Отмена</button>
      </div>
    </template>
    <template  v-else>
      <p >{{ indicator.text }}</p>
    <div class="control-buttons">
      <button @click="setEditMode">Изменить</button>
      <button @click="handleDelete">Удалить</button>
    </div>
    </template>
  </div>
</template>

<style scoped>
  .metric-indicator {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .control-buttons {
    display: flex;
    gap: 10px;
  }
</style>