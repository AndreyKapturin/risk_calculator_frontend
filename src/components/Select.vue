<script setup lang="ts">
import type { IIndicator } from '../../types';

const props = defineProps<{
  indicator: IIndicator;
  index: number;
}>()
const selectName = props.indicator.type + '-' + props.index;
</script>

<template>
  <label>
    {{ indicator.text }}
    <select :name="selectName">
      <option
        v-for="criterion in indicator.criteries"
        :value="criterion.value">
        {{ criterion.text }}
      </option>
    </select>
  </label>
</template>

<style>
  label {
    display: flex;
    flex-direction: column;
  }
</style>