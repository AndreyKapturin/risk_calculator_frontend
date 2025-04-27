<script setup>
  import { toast } from 'vue3-toastify';
  import { removeMetricFromObjectsGroup } from '../api';

  const props = defineProps(['metric', 'isEditMode', 'objectsGroupId']);
  const emit = defineEmits(['removeMetric'])
  const handleRemoveMetric = async () => {
    try {
      const removedMetric = await removeMetricFromObjectsGroup(props.objectsGroupId, props.metric.id);
      emit('removeMetric', removedMetric);
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  }
</script>

<template>
  <div class="metric">
    <div v-if="isEditMode" class="metric__header">
      <p>{{ metric.name }}</p>
      <div class="control-buttons">
        <Button @click="handleRemoveMetric">Удалить</Button>
      </div>
    </div>
    <p v-else class="metric__name">{{ metric.name }}</p>
    <div class="indicator" v-for="indicator in metric.indicators">
      <p>{{ indicator.text }}</p>
      <p>{{ indicator.value }}</p>
    </div>
  </div>
</template>

<style scoped>
  .metric {
    display: flex;
    flex-direction: column;
    gap: 10px;
  } 
  .metric__header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    border-bottom: 1px solid rgb(128, 128, 128);
    padding: 5px 0;
  }
  .control-buttons {
    display: flex;
    justify-content: end;
    gap: 10px;
  }
  .indicator {
    display: flex;
    justify-content: space-between;
  }
  .metric__name {
    border-bottom: 1px solid rgb(128, 128, 128);
  }
</style>