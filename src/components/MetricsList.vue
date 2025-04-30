<script setup>
  import { useLoadData } from '../hooks/useLoadData.js';
  import { getMetrics } from '../api.js';
  import Link from '../ui/Link.vue';
  const { data: metrics, isLoading } = useLoadData(getMetrics);
</script>

<template>
  <Loading v-if="isLoading" />
  <div class="metrics-list" v-else>
    <Link v-for="metric in metrics" :to="`/admin/metrics/${metric.id}`">{{ metric.name }}</Link>
  </div>
</template>

<style scoped>
  .metrics-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>