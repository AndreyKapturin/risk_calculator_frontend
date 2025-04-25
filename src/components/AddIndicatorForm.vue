<script setup>
  import { computed, ref } from 'vue';
  import { addIndicator } from '../api';
  import { toast } from 'vue3-toastify';

  const props = defineProps(['metricId']);
  const emit = defineEmits(['addIndicator']);
  const indicatorText = ref('');
  const isEmpty = computed(() => indicatorText.value === '');

  const handleAddIndicator = async () => {
    try {
      const data = await addIndicator(props.metricId, { text: indicatorText.value });
      // TODO: Заменить на нормальный объект, пришедший ответом на запрос
      emit('addIndicator', {...data, text: indicatorText.value });
      indicatorText.value = '';
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  }

</script>

<template>
  <form class="indicator-form">
    <Input v-model="indicatorText" placeholder="Текст индикатора" />
    <Button type="button" :disabled="isEmpty" @click="handleAddIndicator">Добавить</Button>
  </form>
</template>

<style scoped>
  .indicator-form {
    display: flex;
    gap: 10px;
    width: 100%;
  }
</style>