<script setup>
  import { computed, ref } from 'vue';
  import FormErrorMessage from '../ui/FormErrorMessage.vue';
  import Joi from 'joi';
  import { updateIndicatorsValues } from '../api';
  import { toast } from 'vue3-toastify';

  const props = defineProps(['indicators', 'objectsGroupId']);
  const emit = defineEmits(['updateIndicatorsValues']);
  const indicatorsData = ref(props.indicators.map(i => ({...i})));
  const formErrors = ref(null);
  const isEdited = computed(() => {
    return props.indicators.some((indicator, index) => indicator.value !== indicatorsData.value[index].value)
  })
  const formValidateScheme = Joi.array().required().min(2).items(Joi.object({
    id: Joi.number().min(1).required(),
    text: Joi.string(),
    value: Joi.number().required().messages({
      'number.base': 'Значения индикаторов должны быть числом',
      'any.required': 'Значения индикаторов не должны быть пустыми',
    }),
  }))

  const handleUpdateIndicatorsValues = async () => {
    const { value, error } = formValidateScheme.validate(indicatorsData.value);
    formErrors.value = null;
    
    if (error !== undefined) {
      formErrors.value = error.details[0].message;
      return;
    }
    
    try {
      const updatedIndicators = await updateIndicatorsValues(props.objectsGroupId, value);
      emit('updateIndicatorsValues', updatedIndicators);
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  }

</script>

<template>
  <form class="edit-indicators-values-form">
    <Label v-for="indicator in indicatorsData" :key="indicator.id">
      {{ indicator.text }}
      <Input type="number" v-model="indicator.value"/>
    </Label>
    <FormErrorMessage v-if="formErrors">{{ formErrors }}</FormErrorMessage>
    <Button :disabled="!isEdited" type="button" @click="handleUpdateIndicatorsValues">Сохранить</Button>
  </form>
</template>

<style scoped>
  .edit-indicators-values-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>