<script setup>
  import { useLoadData } from '../hooks/useLoadData.js';
  import { getObjectsGroupsList } from '../api.js';
  import Link from '../ui/Link.vue';
  const { data: objectsGroups, isLoading } = useLoadData(getObjectsGroupsList);
</script>

<template>
  <Loading v-if="isLoading" />
  <div class="list" v-else>
    <Link v-for="objectsGroup in objectsGroups" :to="`/admin/objects-groups/${objectsGroup.id}`">{{ objectsGroup.name }}</Link>
  </div>
</template>

<style scoped>
  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>