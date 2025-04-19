<script setup>
import { ref } from 'vue';
import { updateMetric } from '../api.js';

const props = defineProps(['metric']);
const emit = defineEmits((['updateMetric']))

const metricData = ref({
  name: props.metric.name,
  type: props.metric.type,
});

const onSubmitForm = async () => {
  try {
    const updatedMetric = await updateMetric(props.metric.id, metricData.value);
    emit('updateMetric', updatedMetric);
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <form class="update-metric-form">
    <label for="metric-name">Текст метрики:</label>
    <textarea class="metric-name-textarea" id="metric-name" v-model="metricData.name"></textarea>
    <label for="metric-type">Тип метрики:</label>
    <select id="metric-type" v-model="metricData.type">
      <option value="risk indicator">Индикатор риска</option>
      <option value="good faith criteria">Критерий добросовестности</option>
    </select>
    <button type="button" @click="onSubmitForm">Сохранить</button>
  </form>
</template>

<style scoped>
  .metric-name-textarea {
    resize: vertical;
  }
  .update-metric-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>