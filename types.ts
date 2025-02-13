export enum IndicatorType {
  RiskIndicator = 'riskIndicator',
  GoodFaithCriterion = 'goodFaithCriterion',
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
}
