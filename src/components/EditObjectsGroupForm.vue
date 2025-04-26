<script setup>
  import { computed, ref } from 'vue';
  import { updateObjectsGroup } from '../api.js';
  import Textarea from '../ui/Textarea.vue';
  import FormErrorMessage from '../ui/FormErrorMessage.vue';
  import Joi from 'joi';
import { toast } from 'vue3-toastify';

  const props = defineProps(['objectsGroup']);
  const emit = defineEmits((['updateObjectsGroup']));

  const objectsGroupData = ref({
    name: props.objectsGroup.name,
    socialDamagePotencialScore: props.objectsGroup.socialDamagePotencialScore,
    materialDamagePotencialScore: props.objectsGroup.materialDamagePotencialScore
  })

  const isEdited = computed(() => {
    return (objectsGroupData.value.name !== props.objectsGroup.name)
    || (objectsGroupData.value.socialDamagePotencialScore !== props.objectsGroup.socialDamagePotencialScore)
    || (objectsGroupData.value.materialDamagePotencialScore !== props.objectsGroup.materialDamagePotencialScore) 
  })

  const formErrors = ref(null);
  const formValidateScheme = Joi.object({
    name: Joi.string().min(1).max(1000).messages({
      'string.empty': 'Название группы не может быть пустым',
      'string.max': 'Название группы не может быть больше 1000 символов',
    }),
    socialDamagePotencialScore: Joi.number().messages({
      'number.base': 'Показатель тяжести социальных последствий должен быть числом',
    }),
    materialDamagePotencialScore: Joi.number().messages({
      'number.base': 'Показатель тяжести материальных последствий должен быть числом',
    })
  })
  
  const onSubmitForm = async () => {
    const { value, error } = formValidateScheme.validate(objectsGroupData.value);
    formErrors.value = null;
    
    if (error !== undefined) {
      formErrors.value = error.details[0].message;
      return;
    }
    
    try {
      const updatedObjectsGroup = await updateObjectsGroup(props.objectsGroup.id, value);
      emit('updateObjectsGroup', updatedObjectsGroup);
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  }
</script>

<template>
  <form class="update-objects-group-form">
    <Label>
      Название группы объектов:
      <Textarea v-model="objectsGroupData.name" rows="3"></Textarea>
    </Label>
    <Label>
      Показатель тяжести социальных последствий пожара:
      <Input v-model.number="objectsGroupData.socialDamagePotencialScore" />
    </Label>
    <Label>
      Показатель тяжести материальных последствий пожара:
      <Input v-model.number="objectsGroupData.materialDamagePotencialScore" />
    </Label>
    <FormErrorMessage v-if="formErrors">{{ formErrors }}</FormErrorMessage>
    <Button type="button" :disabled="!isEdited" @click="onSubmitForm">Сохранить</Button>
  </form>
</template>

<style scoped>
  .metric-name-textarea {
    resize: vertical;
  }
  .update-objects-group-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>