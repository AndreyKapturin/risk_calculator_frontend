<script setup>
  import { toast } from 'vue3-toastify';
  import { removeMetricFromObjectsGroup } from '../api';
  import { ref } from 'vue';
  import EditIndicatorsValuesForm from './EditIndicatorsValuesForm.vue';
  import Modal from '../ui/Modal.vue';
  import Confirmation from '../ui/Confirmation.vue';

  const props = defineProps(['metric', 'isEditMode', 'objectsGroupId']);
  const emit = defineEmits(['removeMetric', 'updateIndicatorsValues']);
  const isEditIndicatorsMode = ref(false);
  const isOpenModal = ref(false);
  
  const setEditIndicatorMode = () => {
    isEditIndicatorsMode.value = true;
  }
  const cancelEditIndicatorMode = () => {
    isEditIndicatorsMode.value = false;
  }

  const handleRemoveMetric = async () => {
    try {
      const removedMetric = await removeMetricFromObjectsGroup(props.objectsGroupId, props.metric.id);
      emit('removeMetric', removedMetric);
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  }

  const onUpdateIndicatorsValues = (updatedIndicatorsValues) => {
    emit('updateIndicatorsValues', { metricId: props.metric.id, updatedIndicatorsValues });
    cancelEditIndicatorMode();
  }
</script>

<template>
  <div class="metric">

    <div v-if="isEditMode" class="metric__header">
      <p>{{ metric.name }}</p>
      <div class="control-buttons">
        <Button v-if="isEditIndicatorsMode" @click="cancelEditIndicatorMode">Отмена</Button>
        <template v-else>
          <Button @click="setEditIndicatorMode">Изменить</Button>
          <Button @click="isOpenModal=true">Удалить</Button>
        </template>
      </div>
    </div>

    <p v-else class="metric__name">{{ metric.name }}</p>
    <EditIndicatorsValuesForm
      v-if="isEditIndicatorsMode"
      :indicators="metric.indicators"
      :objectsGroupId
      @updateIndicatorsValues="onUpdateIndicatorsValues"
    />
    <div v-else class="indicator" v-for="indicator in metric.indicators">
      <p>{{ indicator.text }}</p>
      <p>{{ indicator.value }}</p>
    </div>
  </div>
  <Modal :isOpenModal @closeModal="isOpenModal=false">
    <Confirmation
      question="Метрика будет убрана только для текущей группы объектов, а значения её индикаторов будут удалены. Продолжить?"
      @confirm="handleRemoveMetric"
      @cancel="isOpenModal=false"
    />
  </Modal>
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