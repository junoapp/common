import { AnyMark } from 'vega-lite/build/src/mark';

export interface DatasetChartSpec {
  type: AnyMark | 'vertical-bar' | 'horizontal-bar';
  name: string;
  values: DatasetChartSpecValues[];
}

export interface DatasetChartSpecValues {
  name: string;
  value: number;
}
