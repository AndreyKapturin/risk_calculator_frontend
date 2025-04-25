<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { ref, computed } from 'vue';
  import { useLoadData } from '../hooks/useLoadData.js';
  import { deleteMetric, getMetricById } from '../api.js';
  import MetricIndicator from './MetricIndicator.vue';
  import EditMetricForm from './EditMetricForm.vue';
  import { METRIC_TYPES_TRANSLATE } from '../constants.js';
  import { toast } from 'vue3-toastify';
  import AddIndicatorForm from './AddIndicatorForm.vue';

  const route = useRoute();
  const router = useRouter();

  const metricId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  const { data: metric, isLoading } = useLoadData(() => getMetricById(metricId));
  const metricType = computed(() => METRIC_TYPES_TRANSLATE[metric.value.type]);
  const isEditMode = ref(false);

  const onUpdateIndicatorText = (updatedIndicator) => {
    metric.value.indicators = metric.value.indicators.map(indicator => indicator.id == updatedIndicator.id ? updatedIndicator : indicator);
  }

  const onDeleteIndicator = (deletedIndicator) => {
    metric.value.indicators = metric.value.indicators.filter(indicator => indicator.id != deletedIndicator.id);
  }

  const onAddIndicator = (indicator) => {
    metric.value.indicators.push(indicator);
  }

  const onUpdateMetric = (updatedMetric) => {
    metric.value = updatedMetric;
    isEditMode.value = false;
  }

  const setEditMode = () => {
    isEditMode.value = true;
  }

  const cancelEditMode = () => {
    isEditMode.value = false;
  }

  const handleMetricDelete = async () => {
    // TODO: Заменить на кастомную модалку
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
        <Button @click="cancelEditMode">Закрыть</Button>
      </template>
      <template v-else>
        <Button @click="setEditMode">Изменить</Button>
        <Button @click="handleMetricDelete">Удалить</Button>
      </template>
    </div>

    <EditMetricForm v-if="isEditMode" :metric="metric" @updateMetric="onUpdateMetric"/>
    <template v-else>
      <h4>Текст метрики:</h4>
      <p> {{ metric.name }}</p>
      <h4>Тип метрики:</h4>
      <p> {{ metricType }}</p>
    </template>

    <article class="indicators-list">
      <h4>Индикаторы:</h4>
      <AddIndicatorForm v-if="isEditMode" :metricId="metricId" @addIndicator="onAddIndicator" />
      <MetricIndicator
        v-for="(indicator, index) in metric.indicators"
        :indicator="indicator"
        :index
        :isEditMode
        @updateIndicatorText="onUpdateIndicatorText"
        @deleteIndicator="onDeleteIndicator"
      />
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
  }
</style>