<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useLoadData } from '../hooks/useLoadData.js';
import { deleteMetric, getMetricWithIndicatorsById } from '../api.js';
import MetricIndicator from './MetricIndicator.vue';
import EditMetricForm from './EditMetricForm.vue';
import { METRIC_TYPES_TRANSLATE } from '../constants.js';
import { toast } from 'vue3-toastify';

const route = useRoute();
const router = useRouter();
const metricId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
const { data: metric, isLoading, error } = useLoadData(() => getMetricWithIndicatorsById(metricId));
const metricType = computed(() => METRIC_TYPES_TRANSLATE[metric.value.type]);
const onUpdateIndicatorText = (updatedIndicator) => {
  metric.value.indicators = metric.value.indicators.map(indicator => indicator.id == updatedIndicator.id ? updatedIndicator : indicator);
}

const onDeleteIndicator = (deletedIndicator) => {
  metric.value.indicators = metric.value.indicators.filter(indicator => indicator.id != deletedIndicator.id);
}

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

const handleMetricDelete = async () => {
  const isConfimed = confirm('Метрика будет удалена полностью со всеми индикаторами и значениями для каждой группы объектоа. Продолжить?');

  if (isConfimed) {
    try {
      await deleteMetric(metricId);
      router.push('/admin/metrics');
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  }
}

</script>

<template >
  <Loading v-if="isLoading" />
  <article v-else class="metric-card">
    <div class="control-buttons">
      <template v-if="isEditMode">
        <Button @click="cancelEditMode">Отмена</Button>
      </template>
      <template v-else>
        <Button @click="setEditMode">Изменить</Button>
        <Button @click="handleMetricDelete">Удалить</Button>
      </template>
    </div>
    <template v-if="isEditMode">
      <EditMetricForm :metric="metric" @updateMetric="onUpdateMetric"/>
    </template>
    <template v-else>
      <h4>Текст метрики:</h4>
      <p> {{ metric.name }}</p>
      <h4>Тип метрики:</h4>
      <p> {{ metricType }}</p>
    </template>
    <article>
      <h4>Индикаторы:</h4>
      <div class="indicators-list">
        <MetricIndicator
          v-for="(indicator, index) in metric.indicators"
          :indicator="indicator"
          :index
          @update-indicator-text="onUpdateIndicatorText"
          @delete-indicator="onDeleteIndicator"
        />
      </div>
    </article>
  </article>
</template>

<style scoped>
  .metric-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .control-buttons {
    display: flex;
    justify-content: end;
    gap: 10px;
  }
  .indicators-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
</style>