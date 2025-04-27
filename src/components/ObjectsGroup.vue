<script setup>
  import { useRoute } from 'vue-router';
  import { useLoadData } from '../hooks/useLoadData.js';
  import { getObjectsGroupById, getMetrics } from '../api.js';
  import { METRIC_TYPES } from '../constants.js';
  import { computed, ref } from 'vue';
  import EditObjectsGroupForm from './EditObjectsGroupForm.vue';
  import AddMetricForm from './AddMetricForm.vue';
  import AdminMetricCard from './AdminMetricCard.vue';

  const route = useRoute();
  const objectsGroupId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  const { data: objectsGroup, isLoading } = useLoadData(() => getObjectsGroupById(objectsGroupId));
  const { data: metrics } = useLoadData(getMetrics);
  const riskIndicators = computed(() => objectsGroup.value?.metrics?.filter(m => m.type === METRIC_TYPES.RISK_INDICATOR));
  const goodFaithCriteries = computed(() => objectsGroup.value?.metrics?.filter(m => m.type === METRIC_TYPES.GOOD_FAITH_CRITERIA));
  const isEditMode = ref(false);

  const setEditMode = () => isEditMode.value = true;
  const cancelEditMode = () => isEditMode.value = false;
  const handleDeleteObjectsGroup = () => {
    console.log('Delete objects group');
  }

  const onUpdateObjectsGroup = (updatedObjectsGroup) => {
    objectsGroup.value = updatedObjectsGroup;
  }

  const onAddMetric = (addedMetric) => {
    objectsGroup.value.metrics.push(addedMetric);
  }

  const onRemoveMetric = (removedMetric) => {
    objectsGroup.value.metrics = objectsGroup.value.metrics.filter(m => m.id != removedMetric.id);
  }
</script>

<template>
  <Loading v-if="isLoading" />
  <article v-else class="objects-group">
    <div class="objects-group__header">
      <h1>Группа объектов</h1>
      
      <div class="control-buttons">
        <template v-if="isEditMode">
          <Button @click="cancelEditMode">Закрыть</Button>
        </template>
        <template v-else>
          <Button @click="setEditMode">Изменить</Button>
          <Button @click="handleDeleteObjectsGroup">Удалить</Button>
        </template>
      </div>
    </div>

    <EditObjectsGroupForm v-if="isEditMode" :objectsGroup @updateObjectsGroup="onUpdateObjectsGroup"/>
    <template v-else>
      <h4>Название группы объектов:</h4>
      <p>{{ objectsGroup.name }}</p>
      <h4>Показатель тяжести социальных последствий пожара:</h4>
      <p>{{ objectsGroup.socialDamagePotencialScore }}</p>
      <h4>Показатель тяжести материальных последствий пожара:</h4>
      <p>{{ objectsGroup.materialDamagePotencialScore }}</p>
    </template>

    <h2>Метрики:</h2>
    <AddMetricForm v-if="isEditMode" :metrics :objectsGroup @addMetric="onAddMetric" />
    <h3>Индикаторы риска:</h3>
    <AdminMetricCard v-for="metric in riskIndicators" :key="metric.id" :metric :isEditMode :objectsGroupId @removeMetric="onRemoveMetric" />
    <h3>Критерии добросовестности:</h3>
    <AdminMetricCard v-for="metric in goodFaithCriteries" :key="metric.id" :metric :isEditMode :objectsGroupId @removeMetric="onRemoveMetric" />
  </article>
</template>

<style scoped>
  h1 {
    font-size: 1.5rem;
  }
  .objects-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .objects-group__header {
    display: flex;
    justify-content: space-between;
  }
  .control-buttons {
    display: flex;
    justify-content: end;
    gap: 10px;
  }
</style>