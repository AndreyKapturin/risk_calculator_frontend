<script setup>
  import { useRouter } from 'vue-router';
  import NavigationLink from '../ui/NavigationLink.vue';
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  }
</script>

<template>
  <section class="admin-page">
  <aside class="sidebar">
    <NavigationLink :to="'/admin/metrics'">Метрики</NavigationLink>
    <NavigationLink :to="'/admin/create-metric'">Создать метрику</NavigationLink>
    <NavigationLink :to="'/admin/objects-groups'">Группы объектов</NavigationLink>
    <Button class="logout-button" @click="logout">Выйти</Button>
  </aside>
    <RouterView/>
  </section>
</template>

<style scoped>
  .admin-page {
    display: flex;
    gap: 20px;
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    flex: 150px 0 0;
  }
  .logout-button {
    background-color: darkred;
  }
  .logout-button:hover {
    background-color: red;
  }
</style>