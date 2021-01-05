import { FacetedUnitSpec, TopLevel } from 'vega-lite/build/src/spec';

import { DatasetColumnInterface } from '../entity/DatasetColumn';

export type DatasetRecommendation = TopLevel<FacetedUnitSpec> & {
  key: string;
  value: string;
  dimension: DatasetColumnInterface;
  measure: DatasetColumnInterface;
  trimValues: boolean;
};
