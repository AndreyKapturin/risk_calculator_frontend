<script setup lang="ts">
import type { IObjectsGroupForList } from '../../types';
import { getObjectsGroupsList } from '../api';
import { useLoadData } from '../hooks/useLoadData';
import Loading from './Loading.vue';
import ObjectsGroupCard from './ObjectsGroupCard.vue';
const { data: objectsGroups, isLoading, error } = useLoadData<IObjectsGroupForList[]> (getObjectsGroupsList);

</script>

<template>
  <Loading v-if="isLoading" />
  <div v-else-if="error">
    <p>Ошибка при загрузке данных. Попробуйте позже</p>
  </div>
  <nav class="objects-groups-grid">
    <ObjectsGroupCard v-for="objectsGroup in objectsGroups" :objectsGroup="objectsGroup"/>
  </nav>
</template>

<style scoped>
  .objects-groups-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }
</style>