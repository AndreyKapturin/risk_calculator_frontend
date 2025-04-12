<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import Select from '../components/Select.vue';
  import { MetricType, RiskCategory, type IObjectsGroup, type IResult } from '../../types';
  import { computed, ref } from 'vue';
  import { useLoadData } from '../hooks/useLoadData';
  import { getObjectsGroupById } from '../api';
  import Loading from '../components/Loading.vue';

  const getRiskCategory = (index: number) => {
    if (index >= 100) return RiskCategory.ExtremelyHigh;
    if (index >= 45) return RiskCategory.High;
    if (index >= 20) return RiskCategory.Significant;
    if (index >= 9) return RiskCategory.Average;
    if (index >= 4) return RiskCategory.Moderate;
    return RiskCategory.Low;
  }

  const route = useRoute();
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  const { data: objectsGroup, isLoading, error } = useLoadData<IObjectsGroup>(() => getObjectsGroupById(id));

  const riskIndicators = computed(() => objectsGroup.value?.metrics?.filter(m => m.type === MetricType.RiskIndicator));
  const goodFaithCriteries = computed(() => objectsGroup.value?.metrics?.filter(m => m.type === MetricType.GoodFaithCriterion));
  const result = ref<IResult|null>(null);

  
  const handleSubmit = (event: Event) => {
    event.preventDefault();

    // для соблюдения типов
    if (!(event.target instanceof HTMLFormElement)) {
      throw new Error('Неверный целевой элемент');
    }

    let totalRiskIndicator = 0;
    let totalGoodFaithCriteries = 0;

    const formData = new FormData(event.target);
    
    for (const [key, value] of formData) {
      if (key.startsWith(MetricType.RiskIndicator)) {
        totalRiskIndicator += Number(value);
      }
      if (key.startsWith(MetricType.GoodFaithCriterion)) {
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