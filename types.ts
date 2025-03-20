export enum MetricType {
  RiskIndicator = 'risk indicator',
  GoodFaithCriterion = 'good faith criteria',
};

export interface IObjectsGroupForList {
  id: number;
  name: string;
}

export interface IObjectsGroup extends IObjectsGroupForList {
  socialDamagePotencialScore: number;
  materialDamagePotencialScore: number;
  metrics: IMetric[];
}

export interface IMetric {
  name: string;
  type: MetricType,
  indicators: IIndicator[];
}

export interface IIndicator{
  text: string;
  value: number | null;
}

export enum RiskCategory {
  ExtremelyHigh = 'Чрезвычайно высокий',
  High = 'Высокий',
  Significant = 'Значительный',
  Average = 'Средний',
  Moderate = 'Умеренный',
  Low = 'Низкий',
};

export interface IResult {
  totalRiskIndicator: number;
  totalGoodFaithCriteries: number;
  individualizationIndex: number;
  individualizedPotentialDamageIndex: number;
  riskCategory: RiskCategory;
}
