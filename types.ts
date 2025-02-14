export enum IndicatorType {
  RiskIndicator = 'riskIndicator',
  GoodFaithCriterion = 'goodFaithCriterion',
};

export enum RiskCategory {
  ExtremelyHigh = 'Чрезвычайно высокий',
  High = 'Высокий',
  Significant = 'Значительный',
  Average = 'Средний',
  Moderate = 'Умеренный',
  Low = 'Низкий',
};

export interface ICriterion {
  text: string;
  value: number | null;
}

export interface IIndicator {
  text: string;
  criteries: ICriterion[];
}

export interface ITypedIndicator extends IIndicator {
  type: IndicatorType;
}

export interface IObjectOfControl {
  name: string;
  slug: string;
  indicators: IIndicator[];
  href: string;
}

export interface IResult {
  totalRiskIndicator: number;
  totalGoodFaithCriteries: number;
  individualizationIndex: number;
}
