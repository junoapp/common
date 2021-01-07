import { AnyMark } from 'vega-lite/build/src/mark';

export interface DatasetChartSpec {
  type: AnyMark | 'vertical-bar' | 'horizontal-bar' | 'line-2';
  name: string;
  hasSecondAxis: boolean;
  values: DatasetChartSpecValues[];
}

export interface DatasetChartSpecValues {
  name: string;
  value: number;
  value2?: number;
}
