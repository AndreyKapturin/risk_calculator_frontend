<script setup>
  import { useRoute } from 'vue-router';
  import { useLoadData } from '../hooks/useLoadData.js';
  import { getObjectsGroupById } from '../api.js';
  import { METRIC_TYPES } from '../constants.js';
  import { computed } from 'vue';

  const route = useRoute();
  const objectsGroupId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  const { data: objectsGroup, isLoading } = useLoadData(() => getObjectsGroupById(objectsGroupId));
  const riskIndicators = computed(() => objectsGroup.value?.metrics?.filter(m => m.type === METRIC_TYPES.RISK_INDICATOR));
  const goodFaithCriteries = computed(() => objectsGroup.value?.metrics?.filter(m => m.type === METRIC_TYPES.GOOD_FAITH_CRITERIA));

</script>

<template>
  <Loading v-if="isLoading" />
  <article v-else class="objects-group">
    <h1>{{ objectsGroup.name }}</h1>
    <p>Показатель тяжести социальных последствий пожара:</p>
    <p>{{ objectsGroup.socialDamagePotencialScore }}</p>
    <p>Показатель тяжести материальных последствий пожара:</p>
    <p>{{ objectsGroup.materialDamagePotencialScore }}</p>

    <h2>Метрики:</h2>

    <h3>Индикаторы риска:</h3>
    <div class="metric" v-for="metric in riskIndicators">
      <p class="metric__name">{{ metric.name }}</p>
      <div class="indicator" v-for="indicator in metric.indicators">
        <p>{{ indicator.text }}</p>
        <p>{{ indicator.value }}</p>
      </div>
    </div>

    <h3>Критерии добросовестности:</h3>
    <div class="metric" v-for="metric in goodFaithCriteries">
      <p class="metric__name">{{ metric.name }}</p>
      <div class="indicator" v-for="indicator in  metric.indicators">
        <p>{{ indicator.text }}</p>
        <p>{{ indicator.value }}</p>
      </div>
    </div>

  </article>
</template>

<style scoped>
  h1 {
    font-size: 1.5rem;
  }
  .objects-group, .metric {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .metric__name {
    border-bottom: 1px solid rgb(128, 128, 128);
  }

  .indicator {
    display: flex;
    justify-content: space-between;
  }
</style>