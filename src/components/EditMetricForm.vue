<script setup>
  import { computed, ref } from 'vue';
  import { updateMetric } from '../api.js';
  import Textarea from '../ui/Textarea.vue';
  import { METRIC_TYPES, METRIC_TYPES_TRANSLATE } from '../constants.js';
  import FormErrorMessage from '../ui/FormErrorMessage.vue';
  import Joi from 'joi';
  import { toast } from 'vue3-toastify';

  const props = defineProps(['metric']);
  const emit = defineEmits((['updateMetric']))

  const metricData = ref({
    name: props.metric.name,
    type: props.metric.type,
  });

  const isEdited = computed(() => (metricData.value.name !== props.metric.name) || (metricData.value.type !== props.metric.type))

  const formErrors = ref(null);
  const formValidateScheme = Joi.object(
    {
      name: Joi.string().min(1).max(1000).messages({
        'string.empty': 'Текст метрики не может быть пустым',
        'string.max': 'Текст метрики не может быть больше 1000 символов',
      }),
      type: Joi.valid(METRIC_TYPES.RISK_INDICATOR, METRIC_TYPES.GOOD_FAITH_CRITERIA),
    }
  );

  const onSubmitForm = async () => {
    const { value, error } = formValidateScheme.validate(metricData.value);
    formErrors.value = null;

    if (error !== undefined) {
      formErrors.value = error.details[0].message;
      return;
    }
    
    try {
      const updatedMetric = await updateMetric(props.metric.id, value);
      emit('updateMetric', updatedMetric);
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  }
</script>

<template>
  <form class="update-metric-form">
    <Label>
      Текст метрики:
      <Textarea v-model="metricData.name" rows="3" />
    </Label>
    <Label>
      Тип метрики:
      <Select v-model="metricData.type">
        <option :value="METRIC_TYPES.RISK_INDICATOR">{{ METRIC_TYPES_TRANSLATE[METRIC_TYPES.RISK_INDICATOR] }}</option>
        <option :value="METRIC_TYPES.GOOD_FAITH_CRITERIA">{{ METRIC_TYPES_TRANSLATE[METRIC_TYPES.GOOD_FAITH_CRITERIA] }}</option>
      </Select>
    </Label>
    <FormErrorMessage v-if="formErrors">{{ formErrors }}</FormErrorMessage>
    <Button :disabled="!isEdited" type="button" @click="onSubmitForm">Сохранить</Button>
  </form>
</template>

<style scoped>
  .metric-name-textarea {
    resize: vertical;
  }
  .update-metric-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>