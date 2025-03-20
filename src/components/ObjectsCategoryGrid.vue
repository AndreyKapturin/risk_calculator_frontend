<script setup lang="ts">
import type { IObjectsGroupForList } from '../../types';
import { getObjectsGroupsList } from '../api';
import { useLoadData } from '../hooks/useLoadData';
import Loading from './Loading.vue';

const { data: objectsGroups, isLoading, error } = useLoadData<IObjectsGroupForList[]> (getObjectsGroupsList);

</script>

<template>
  <Loading v-if="isLoading" />
  <div v-else-if="error">
    <p>Ошибка при загрузке данных. Попробуйте позже</p>
  </div>
  <nav v-else>
    <ul class="object-categories-grid">
      <li v-for="objectsGroup in objectsGroups">
        <RouterLink :to="'/objects-groups/' + objectsGroup.id" >{{objectsGroup.name}}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  .object-categories-grid {
    list-style-type: none;
  }
</style>