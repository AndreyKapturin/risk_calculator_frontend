<script setup>
  import { ref } from 'vue';
  import { authenticate } from '../api';
  import { toast } from 'vue3-toastify';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const userData = ref({ login: '', password: '' });

  const onSubmitForm = async () => {
    try {
      const { accessToken } = await authenticate(userData.value);
      localStorage.setItem('accessToken', accessToken);
      router.push('/admin');
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  }
</script>

<template>
  <section>
    <form class="login-form">
      <Label>
        Логин
        <Input v-model="userData.login"/>
      </Label>
      <Label>
        Пароль
        <Input v-model="userData.password" type="password" autocomplete="off" />
      </Label>
      <Button @click="onSubmitForm" type="button">Войти</Button>
    </form>
  </section>
</template>

<style scoped>
  .login-form {
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>