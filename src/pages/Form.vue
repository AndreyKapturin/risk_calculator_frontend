<script setup lang="ts">
  import { getObjectsOfControlBySlug } from '../../DAL';
  import { useRoute } from 'vue-router'
  import Select from '../components/Select.vue';
  import { IndicatorType, type IResult } from '../../types';
  import { ref } from 'vue';

  const route = useRoute();
  const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
  const objectOfControls = getObjectsOfControlBySlug(slug);
  const riskIndicators = objectOfControls?.indicators.filter(i => i.type === IndicatorType.RiskIndicator);
  const goodFaithCriteries = objectOfControls?.indicators.filter(i => i.type === IndicatorType.GoodFaithCriterion);
  const result = ref<IResult|null>(null);

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    if (!(event.target instanceof HTMLFormElement)) {
      throw new Error('Неверный целевой элемент');
    }

    const total = {
      totalRiskIndicator: 0,
      totalGoodFaithCriteries: 0,
    };

    const formData = new FormData(event.target);
    
    for (const [key, value] of formData) {
      if (key.startsWith(IndicatorType.RiskIndicator)) {
        total.totalRiskIndicator += Number(value);
      }
      if (key.startsWith(IndicatorType.GoodFaithCriterion)) {
        total.totalGoodFaithCriteries += Number(value);
      }
    }

    result.value = total;
  }

</script>

<template>
  <section>
    <h1>{{ objectOfControls?.name }}</h1>
    <form @submit="handleSubmit" class="indicators-form">
      <fieldset>
        <legend>Индикаторы риска</legend>
        <Select
          v-for="(indicator, index) in riskIndicators"
          :indicator="indicator"
          :index="index"
        />
      </fieldset>
      <fieldset>
        <legend>Критерии добросовестности</legend>
        <Select
          v-for="(indicator, index) in goodFaithCriteries"
          :indicator="indicator"
          :index="index"
        />
      </fieldset>
      <button type="submit">Рассчитать</button>
    </form>
    <article v-if="result">
      <h2>Результаты:</h2>
      <p>∑ Iкрд = {{ result.totalGoodFaithCriteries }}</p>
      <p>∑ Iрпв = {{ result.totalRiskIndicator }}</p>
      <p>Uинд =∑ Iрпв+∑ Iкрд= {{result.totalGoodFaithCriteries + result.totalRiskIndicator }}</p>
      <p>Кг.т.инд.= Uинд+Кгт = {{objectOfControls?.potentialNegativeConsequencesIndex + result.totalRiskIndicator }}</p>
    </article>
  </section>
</template>

<style>
  .indicators-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .indicators-form fieldset legend {
    font-weight: 700;
    font-size: 1.25rem;
  }

  .indicators-form fieldset {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 5px;
  }
</style>