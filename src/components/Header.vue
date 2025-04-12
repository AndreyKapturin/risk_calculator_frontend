<script setup lang="ts">

</script>

<template>
  <header class="header">
    <div class="content">
      <RouterLink class="link" to="/">КАТЕГОРИЯРИСКА.РФ</RouterLink>
    </div>
  </header>
</template>

<style>
  .header {
    display: flex;
    padding: 20px 5px;
    background-color: var(--primary-color);
  }
  
  .link {
    text-decoration: none;
    color: var(--text-color);
    font-size: clamp(1.5rem, 5vw ,2rem);
    font-weight: 700;
  }
</style>