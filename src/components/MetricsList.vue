<script setup>
  import { useLoadData } from '../hooks/useLoadData.js';
  import { getAllMetricsWithIndicators } from '../api.js';
  import Loading from '../components/Loading.vue';

  const { data: metrics, isLoading } = useLoadData(getAllMetricsWithIndicators);

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