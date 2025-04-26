<script setup>
  import { watch, ref, computed } from 'vue';
  import { addMetricToObjectsGroup } from '../api';
  import { toast } from 'vue3-toastify';
  import Joi from 'joi';
  import FormErrorMessage from '../ui/FormErrorMessage.vue';

  const props = defineProps(['objectsGroup', 'metrics']);
  const emit = defineEmits(['addMetric']);
  const freeMetrics = computed(() => props.metrics.filter(m => !props.objectsGroup.metrics.find(({ id }) => m.id === id)));
  const addedMetricId = ref(null);
  const addedMetric = ref(null);
  const formErrors = ref(null);

  watch(addedMetricId, (id) => {
    if (!id) return;
    const findedMetric = freeMetrics.value.find(m => m.id === id);
    addedMetric.value = {
      name: findedMetric.name,
      type: findedMetric.type,
      id: findedMetric.id,
      indicators: findedMetric.indicators.map(indicator => ({ ...indicator })),
    };
  })

  const formValidateScheme = Joi.object({
    id: Joi.number().min(1).required(),
    name: Joi.string(),
    type: Joi.string(),
    indicators: Joi.array().required().min(2).items(Joi.object({
      id: Joi.number().min(1).required(),
      text: Joi.string(),
      value: Joi.number().required().messages({
        'number.base': 'Значения индикаторов должны быть числом',
        'any.required': 'Значения индикаторов не должны быть пустыми',
      }),
    }))
  })

  const handleAddMetric = async () => {
    const { value, error } = formValidateScheme.validate(addedMetric.value);
    formErrors.value = null;
    
    if (error !== undefined) {
      formErrors.value = error.details[0].message;
      return;
    }

    try {
      await addMetricToObjectsGroup(props.objectsGroup.id, {
        id: value.id,
        indicators: value.indicators
      });
      emit('addMetric', value);
      addedMetric.value = null;
      addedMetricId.value = null;
    } catch (error) {
      toast(error.massage, { type: 'error' });
    }
  }
</script>

<template>
  <form class="add-metric-form">
    <Label>
      Новая метрика:
      <Select v-model="addedMetricId">
        <option :value="null">Не выбрано</option>
        <option v-for="metric in freeMetrics" :value="metric.id">{{ metric.name }}</option>
      </Select>
    </Label>
    <Label v-if="addedMetricId" v-for="indicator in addedMetric.indicators">
      {{ indicator.text }}
      <Input v-model="indicator.value" />
    </Label>
    <FormErrorMessage v-if="formErrors">{{ formErrors }}</FormErrorMessage>
    <Button v-if="addedMetricId" type="button" @click="handleAddMetric">Добавить метрику</Button>
  </form>
</template>

<style scoped>
  .add-metric-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>