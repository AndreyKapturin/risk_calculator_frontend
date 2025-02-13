<script setup lang="ts">
import type { ITypedIndicator } from '../../types';

const props = defineProps<{
  indicator: ITypedIndicator;
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