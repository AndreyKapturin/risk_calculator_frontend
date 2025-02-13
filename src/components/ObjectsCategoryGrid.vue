<script setup lang="ts">
import { getObjectsOfControl } from '../../DAL';
const objectCategoriesLinks = getObjectsOfControl();
</script>

<template>
  <nav>
    <ul class="object-categories-grid">
      <li v-for="objectCategoriesLink in objectCategoriesLinks">
        <RouterLink :to="objectCategoriesLink.href" >{{objectCategoriesLink.name}}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style>
  .object-categories-grid {
    list-style-type: none;
  }

</style>