<script setup lang="ts">
  import { useLoadData } from '../hooks/useLoadData.ts';
  import { getAllMetricsWithIndicators } from '../api.ts';
  import Loading from '../components/Loading.vue';
  import MetricCard from '../components/MetricCard.vue';

  const { data: metrics, isLoading, error } = useLoadData<IObjectsGroup>(getAllMetricsWithIndicators);

</script>

<template>
  <Loading v-if="isLoading" />
  <div class="metrics-list" v-else>
    <h1>Метрики</h1>
    <RouterLink v-for="metric in metrics" :to="`/admin/metrics/${metric.id}`">{{ metric.name }}</RouterLink>
  </div>
</template>

<style scoped>
  .metrics-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>