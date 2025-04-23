<script setup>
import { computed, ref } from 'vue';
import { updateMetricIndicatorText, deleteIndicator } from '../api.js';

const props = defineProps(['indicator', 'index']);
const emit = defineEmits(['updateIndicatorText', 'deleteIndicator']);

const isEditMode = ref(false);
const indicatorText = ref(props.indicator.text);
const isEdited = computed(() => props.indicator.text !== indicatorText.value);

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
    <template v-if="isEditMode">
      <Input  v-model="indicatorText" />
      <div class="control-buttons">
        <Button :disabled="!isEdited" @click="saveChanges">Сохранить</Button>
        <Button @click="cancelEditMode">Отмена</Button>
      </div>
    </template>
    <template  v-else>
      <p >{{ indicator.text }}</p>
    <div class="control-buttons">
      <Button @click="setEditMode">Изменить</Button>
      <Button v-if="index > 1" @click="handleDelete">Удалить</Button>
    </div>
    </template>
  </div>
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