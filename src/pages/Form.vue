<script setup>
  import { useRoute } from 'vue-router'
  import { computed, ref } from 'vue';
  import { useLoadData } from '../hooks/useLoadData.js';
  import { getObjectsGroupById } from '../api.js';
  import { METRIC_TYPES } from '../constants.js';
  import { calcRisk } from '../features/calclulateRiskCategory.js';
  import { toast } from 'vue3-toastify';

  const route = useRoute();
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  const { data: objectsGroup, isLoading, error } = useLoadData(() => getObjectsGroupById(id));

  const riskIndicators = computed(() => objectsGroup.value?.metrics?.filter(m => m.type === METRIC_TYPES.RISK_INDICATOR));
  const goodFaithCriteries = computed(() => objectsGroup.value?.metrics?.filter(m => m.type === METRIC_TYPES.GOOD_FAITH_CRITERIA));
  const result = ref(null);

  const parseFormData = (formData) => {
    const objectInfo = {
      riskIndicatorsValues: [],
      goodFaithCriteriesValues: [],
      socialDamagePotencialScore: objectsGroup.value.socialDamagePotencialScore,
      materialDamagePotencialScore: objectsGroup.value.materialDamagePotencialScore
    };

    for (const [key, value] of formData) {
      if (key.startsWith(METRIC_TYPES.RISK_INDICATOR)) {
        objectInfo.riskIndicatorsValues.push(Number(value));
      }
      if (key.startsWith(METRIC_TYPES.GOOD_FAITH_CRITERIA)) {
        objectInfo.goodFaithCriteriesValues.push(Number(value));
      }
      if (key === 'isGovernmentOwnership') {
        objectInfo.isGovernmentOwnership = value === '1'
      }
      if (key === 'hasSeveralControlledPersons') {
        objectInfo.hasSeveralControlledPersons = value === '1'
      }
    }

    return objectInfo;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const objectInfo = parseFormData(formData);

    if (objectInfo.isGovernmentOwnership === undefined) {
      toast('Выберите форму собственности объекта', { type: 'error' });
      return;
    }

    if (objectInfo.hasSeveralControlledPersons === undefined) {
      toast('Укажите количество контролируемых лиц на объекте зашиты', { type: 'error' });
      return;
    }

    result.value = calcRisk(objectInfo);
  }

</script>

<template>
  <Loading v-if="isLoading" />
  
  <div v-else-if="error">
    <p>Ошибка при загрузке данных. Попробуйте позже</p>
  </div>
  <section v-else class="form-page">
    <h1>{{ objectsGroup.name }}</h1>

    <form @submit="handleSubmit" class="indicators-form">
      <h3>Общая информация</h3>
      <Label>
        Объект защиты находится в государственной или муниципальной собственности?
        <Select name="isGovernmentOwnership" ref="governmentOwnershipSelect">
          <option value="1">Да</option>
          <option value="0">Нет</option>
        </Select>
      </Label>
      <Label>
        На объекте защиты осуществляют экономическую деятельность более одного контролируемого лица?
        <Select name="hasSeveralControlledPersons">
          <option value="1">Да</option>
          <option value="0">Нет</option>
        </Select>
      </Label>

      <h3>Индикаторы риска</h3>
      <template v-for="(metric, index) in riskIndicators">
        <Label>
          {{ metric.name }}
          <Select :name="metric.type + '-' + index">
            <option
              v-for="indicator in metric.indicators"
              :value="indicator.value ?? 0">
              {{ indicator.text }}
            </option>
          </Select>
        </Label>
      </template>

      <h3>Критерии добросовестности</h3>
       <template v-for="(metric, index) in goodFaithCriteries">
        <Label>
          {{ metric.name }}
          <Select :name="metric.type + '-' + index">
            <option
              v-for="indicator in metric.indicators"
              :value="indicator.value">
              {{ indicator.text }}
            </option>
          </Select>
        </Label>
      </template>

      <Button>Рассчитать</Button>
    </form>

    <article v-if="result" class="result">
      <h2>Результаты:</h2>
      <p><b>Сумма значений индикаторов риска:</b></p>
      <p>∑ I<sub>рпв</sub> = {{ result.riskIndicatorsValuesSum }}</p>
      <p><b>Сумма значений критиериев добросовестности:</b></p>
      <p>∑ I<sub>крд</sub> = {{ result.goodFaithCriteriesValuesSum }}</p>
      <p><b>Индекс индивидуализации подконтрольного лица:</b></p>
      <p>U<sub>инд</sub> = {{result.individualizationIndex }}</p>
      <p><b>Показатель тяжести потенциальных негативных последствий пожара с учетом индекса индивидуализации подконтрольного лица:</b></p>
      <p>К<sub>Г.Т.М.инд.</sub>= {{ result.potencialDamageScore}}</p>
      <p>Категория риска объекта - {{ result.riskCategory }}</p>
    </article>

  </section>
</template>

<style scoped>
  .form-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .indicators-form,
  .result {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>