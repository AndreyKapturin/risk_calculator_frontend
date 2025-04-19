<script setup>
  import { useRoute } from 'vue-router'
  import Select from '../components/Select.vue';
  import { computed, ref } from 'vue';
  import { useLoadData } from '../hooks/useLoadData.js';
  import { getObjectsGroupById } from '../api.js';
  import Loading from '../components/Loading.vue';
  import { RISK_CATEGORIES, METRIC_TYPES } from '../constants.js';
  

  const getRiskCategory = (index) => {
    if (index >= 100) return RISK_CATEGORIES.EXTREMELY_HIGH;
    if (index >= 45) return RISK_CATEGORIES.HIGH;
    if (index >= 20) return RISK_CATEGORIES.SIGNIFICANT;
    if (index >= 9) return RISK_CATEGORIES.AVERAGE;
    if (index >= 4) return RISK_CATEGORIES.MODERATE;
    return RISK_CATEGORIES.LOW;
  }

  const route = useRoute();
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  const { data: objectsGroup, isLoading, error } = useLoadData(() => getObjectsGroupById(id));

  const riskIndicators = computed(() => objectsGroup.value?.metrics?.filter(m => m.type === METRIC_TYPES.RISK_INDICATOR));
  const goodFaithCriteries = computed(() => objectsGroup.value?.metrics?.filter(m => m.type === METRIC_TYPES.GOOD_FAITH_CRITERIA));
  const result = ref(null);

  
  const handleSubmit = (event) => {
    event.preventDefault();

    let totalRiskIndicator = 0;
    let totalGoodFaithCriteries = 0;

    const formData = new FormData(event.target);
    
    for (const [key, value] of formData) {
      if (key.startsWith(METRIC_TYPES.RISK_INDICATOR)) {
        totalRiskIndicator += Number(value);
      }
      if (key.startsWith(METRIC_TYPES.GOOD_FAITH_CRITERIA)) {
        totalGoodFaithCriteries += Number(value);
      }
    }

    const individualizationIndex = totalRiskIndicator + totalGoodFaithCriteries
    const individualizedPotentialDamageIndex = individualizationIndex + (objectsGroup?.value?.socialDamagePotencialScore ?? 0);
    const riskCategory = getRiskCategory(individualizedPotentialDamageIndex)
    
    result.value = {
      totalRiskIndicator,
      totalGoodFaithCriteries,
      individualizationIndex,
      individualizedPotentialDamageIndex,
      riskCategory
    }
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
      <h3>Индикаторы риска</h3>
      <Select
        v-for="(indicator, index) in riskIndicators"
        :metric="indicator"
        :index="index"
      />
      <h3>Критерии добросовестности</h3>
      <Select
        v-for="(criteria, index) in goodFaithCriteries"
        :metric="criteria"
        :index="index"
      />
      <button class="button" type="submit">Рассчитать</button>
    </form>
    <article v-if="result">
      <h2>Результаты:</h2>
      <p>∑ Iкрд = {{ result.totalGoodFaithCriteries }}</p>
      <p>∑ Iрпв = {{ result.totalRiskIndicator }}</p>
      <p>Uинд =∑ Iрпв+∑ Iкрд= {{result.individualizationIndex }}</p>
      <p>Кг.т.инд.= Uинд+Кгт = {{ result.individualizedPotentialDamageIndex}}</p>
      <p>Категория риска объекта = {{ result.riskCategory }}</p>
    </article>
  </section>
</template>

<style scoped>
  .form-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .indicators-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .button {
    padding: 10px 5px;
    border-radius: var(--border-radius);
    cursor: pointer;
    background-color: var(--primary-color);
    color: var(--text-color);
    border: none;
  }
  
  .button:hover {
    background-color: var(--secondary-color);
  }
</style>