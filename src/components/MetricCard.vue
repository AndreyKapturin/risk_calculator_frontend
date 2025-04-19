<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import type { IMetric } from '../../types.ts';
import { useLoadData } from '../hooks/useLoadData.ts';
import { getMetricWithIndicatorsById } from '../api.ts';
import Loading from './Loading.vue';  
import MetricIndicator from './MetricIndicator.vue';
import EditMetricForm from './EditMetricForm.vue';

const METRIC_TYPES_TRANSLATE = {
  'risk indicator': 'Индикатор риска',
  'good faith criteria': 'Критерий добросовестности',
}
const route = useRoute();
const metricId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
const { data: metric, isLoading, error } = useLoadData<IMetric>(() => getMetricWithIndicatorsById(metricId));
const metricType = computed(() => METRIC_TYPES_TRANSLATE[metric.value.type]);
const onUpdateIndicatorText = (updatedIndicator) => {
  metric.value.indicators = metric.value.indicators.map(indicator => indicator.id == updatedIndicator.id ? updatedIndicator : indicator);
}

const onDeleteIndicator = (deletedIndicator) => {
  metric.value.indicators = metric.value.indicators.filter(indicator => indicator.id != deletedIndicator.id);
}

const metricData = ref({
  name: computed(() => metric.value.name)
})

const isEditMode = ref(false);
const setEditMode = () => {
  isEditMode.value = true;
}

const cancelEditMode = () => {
  isEditMode.value = false;
}

const onUpdateMetric = (updatedMetric) => {
  metric.value = { ...metric.value, ...updatedMetric };
  isEditMode.value = false;
}

</script>

<template >
  <Loading v-if="isLoading" />
  <article v-else class="metric-card">
    <div class="control-buttons">
      <template v-if="isEditMode">
        <button @click="cancelEditMode">Отмена</button>
      </template>
      <template v-else>
        <button @click="setEditMode">Изменить</button>
      </template>
    </div>
    <template v-if="isEditMode">
      <EditMetricForm :metric="metric" @updateMetric="onUpdateMetric"/>
    </template>
    <template v-else>
      <p>Имя метрики: {{ metric.name }}</p>
      <p>Тип метрики: {{ metricType }}</p>
    </template>
    <article>
      <h4>Индикаторы:</h4>
      <MetricIndicator
        v-for="indicator in metric.indicators"
        :indicator="indicator"
        @update-indicator-text="onUpdateIndicatorText"
        @delete-indicator="onDeleteIndicator"
        />
    </article>
  </article>
</template>

<style scoped>
  .metric-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .control-buttons {
    display: flex;
    justify-content: end;
  }
</style>