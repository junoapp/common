import { AnyMark } from 'vega-lite/build/src/mark';

export type JunoMark =
  | AnyMark
  | 'vertical-bar'
  | 'horizontal-bar'
  | 'multiple-line'
  | 'stacked-vertical-bar'
  | 'stacked-horizontal-bar'
  | 'heatmap';
