<script setup>
  import { ref } from 'vue';
  import { createMetric } from '../api.js';
  import Joi from 'joi';
  import { METRIC_TYPES, METRIC_TYPES_TRANSLATE } from '../constants.js';
  import Textarea from '../ui/Textarea.vue';
  import FormErrorMessage from '../ui/FormErrorMessage.vue';
  import { toast } from 'vue3-toastify';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const metricData = ref({
    name: '',
    type: 'risk indicator',
    indicators: [
      {
        text: ''
      },
      {
        text: ''
      }
    ]
  });

  const formErrors = ref(null);
  const formValidateScheme = Joi.object(
    {
      name: Joi.string().min(1).max(1000).messages({
        'string.empty': 'Текст метрики не может быть пустым',
        'string.max': 'Текст метрики не может быть больше 1000 символов',
      }),
      type: Joi.valid(METRIC_TYPES.RISK_INDICATOR, METRIC_TYPES.GOOD_FAITH_CRITERIA),
      indicators: Joi.array().min(2).items(Joi.object({
        text: Joi.string().min(1).max(512).messages({
        'string.empty': 'Индикаторы не могут быть пустыми',
      }),
      }))
    }
  );

  const addIndicator = () => {
    metricData.value.indicators.push({ text: '' });
  }

  const onSubmitForm = async () => {
    const { value, error } = formValidateScheme.validate(metricData.value);
    formErrors.value = null;

    if (error !== undefined) {
      formErrors.value = error.details[0].message;
      return;
    }
    
    try {
      const { id } = await createMetric(value);
      router.push(`/admin/metrics/${id}`);
    } catch (error) {
      toast(error.message, {
        type: 'error',
        autoClose: 2000
      })
    }
  }

  const deleteIndicator = (index) => {
    metricData.value.indicators = metricData.value.indicators.filter((e, i) => i !== index);
  }
</script>

<template>
  <form class="create-metric-form">
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
    <fieldset class="indicators-fieldset">
      <legend>Индикаторы:</legend>
      <template v-for="(indicator, i) in metricData.indicators">
        <div class="removable-indicator-input" v-if="i > 1">
          <Input v-model="metricData.indicators[i].text" />
          <Button @click="deleteIndicator(i)">Удалить</Button>
        </div>
        <Input v-else v-model="metricData.indicators[i].text" />
      </template>
      <FormErrorMessage v-if="formErrors">{{ formErrors }}</FormErrorMessage>
      <Button @click="addIndicator" type="button">Добавить индкатор</Button>
    </fieldset>
    <Button type="button" @click="onSubmitForm">Создать метрику</Button>
  </form>
</template>

<style scoped>
  .create-metric-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .indicators-fieldset { 
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: none;
  }
  .removable-indicator-input {
    display: flex;
    gap: 10px;
  }
</style>