<script setup>
  import ObjectsGroupsGrid from '../components/ObjectsGroupsGrid.vue';
</script>

<template>
  <section class="main-page">
    <h1>Группы объектов защиты</h1>
    <ObjectsGroupsGrid />
  </section>
</template>

<style>
  .main-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>