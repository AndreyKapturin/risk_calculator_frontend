<script setup lang="ts">
import type { IMetric } from '../../types';

const props = defineProps<{
  metric: IMetric;
  index: number;
}>()
const selectName = props.metric.type + '-' + props.index;
</script>

<template>
  <label>
    {{ metric.name }}
    <select :name="selectName" class="select">
      <option
        v-for="indicator in metric.indicators"
        :value="indicator.value">
        {{ indicator.text }}
      </option>
    </select>
  </label>
</template>

<style scoped>
  .select {
    border-radius: var(--border-radius);
    padding: 5px 10px;
    cursor: pointer;
    width: 100%;
  }
  
  label {
    display: flex;
    flex-direction: column;
  }
</style>