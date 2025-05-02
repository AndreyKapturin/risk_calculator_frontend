import { RISK_CATEGORIES } from "../constants";

const getRiskCategory = (potencialDamageScore) => {
  if (potencialDamageScore >= 100) return RISK_CATEGORIES.EXTREMELY_HIGH;
  if (potencialDamageScore >= 45) return RISK_CATEGORIES.HIGH;
  if (potencialDamageScore >= 20) return RISK_CATEGORIES.SIGNIFICANT;
  if (potencialDamageScore >= 9) return RISK_CATEGORIES.AVERAGE;
  if (potencialDamageScore >= 4) return RISK_CATEGORIES.MODERATE;
  return RISK_CATEGORIES.LOW;
}

const calcRiskIndicatorsValuesSum = (riskIndicatorsValues) => {
  return riskIndicatorsValues.reduce((sum, riskIndicator) => sum + riskIndicator, 0);
}

const calcGoodFaithCriteriesValuesSum = (goodFaithCriteriesValues) => {
  return goodFaithCriteriesValues.reduce((sum, riskIndicator) => sum + riskIndicator, 0);
}

const calcIndividualizationIndex = (riskIndicatorsValuesSum, goodFaithCriteriesValuesSum) => {
  return riskIndicatorsValuesSum + goodFaithCriteriesValuesSum;
}

const calcPotencialDamageScore = (individualizationIndex, objectInfo) => {
  return individualizationIndex + objectInfo.socialDamagePotencialScore;
}

const calcPotencialDamageScoreIncludeMaterialDamage = (individualizationIndex, objectInfo) => {
  return Math.sqrt(Math.pow(objectInfo.socialDamagePotencialScore, 2) + Math.pow(objectInfo.materialDamagePotencialScore, 2)) + individualizationIndex;
}

export const calcRisk = (objectInfo) => {
  const riskIndicatorsValuesSum = calcRiskIndicatorsValuesSum(objectInfo.riskIndicatorsValues);
  const goodFaithCriteriesValuesSum = calcGoodFaithCriteriesValuesSum(objectInfo.goodFaithCriteriesValues);
  const individualizationIndex = calcIndividualizationIndex(riskIndicatorsValuesSum, goodFaithCriteriesValuesSum);
  const isIncludeMaterialDamage = objectInfo.isGovernmentOwnership || objectInfo.hasSeveralControlledPersons;

  let potencialDamageScore = 0;
  if (isIncludeMaterialDamage) {
    potencialDamageScore = calcPotencialDamageScoreIncludeMaterialDamage(individualizationIndex, objectInfo);
  } else {
    potencialDamageScore = calcPotencialDamageScore(individualizationIndex, objectInfo);
  }

  const riskCategory = getRiskCategory(potencialDamageScore);
  
  return {
    riskIndicatorsValuesSum,
    goodFaithCriteriesValuesSum,
    individualizationIndex,
    potencialDamageScore,
    riskCategory
  };
}
