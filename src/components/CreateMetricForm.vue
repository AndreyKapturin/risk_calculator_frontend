<script setup>
import { ref } from 'vue';
import { createMetric } from '../api.js';
import Joi from 'joi';
import { METRIC_TYPES } from '../constants.js';

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
    name: Joi.string().min(1).messages({
      'string.empty': 'Текст метрики не может быть пустым',
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

const onSubmitForm = () => {
  const { value, error } = formValidateScheme.validate(metricData.value);
  formErrors.value = null;

  if (error !== undefined) {
    formErrors.value = error.details[0].message;
    return;
  }
  
  createMetric(metricData.value);
}

const deleteIndicator = (index) => {
  metricData.value.indicators = metricData.value.indicators.filter((e, i) => i !== index);
}

</script>

<template>
  <form class="create-metric-form">
    <label for="metric-name">Текст метрики:</label>
    <textarea class="metric-name-textarea" id="metric-name" v-model="metricData.name"></textarea>
    <label for="metric-type">Тип метрики:</label>
    <select id="metric-type" v-model="metricData.type">
      <option value="risk indicator">Индикатор риска</option>
      <option value="good faith criteria">Критерий добросовестности</option>
    </select>
    <fieldset class="indicators-fieldset">
      <legend>Индикаторы:</legend>
      <template v-for="(indicator, i) in metricData.indicators">
        <div v-if="i > 1">
          <input v-model="metricData.indicators[i].text">
          <button @click="deleteIndicator(i)">Удалить</button>
        </div>
        <input v-else v-model="metricData.indicators[i].text">
      </template>
      <button @click="addIndicator" type="button">Добавить индкатор</button>
    </fieldset>
    <button type="button" @click="onSubmitForm">Создать метрику</button>
    <span v-if="formErrors">{{ formErrors }}</span>
  </form>
</template>

<style scoped>
  .metric-name-textarea {
    resize: vertical;
  }
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
</style>