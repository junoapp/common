import { SpecQuery } from 'compassql/build/src/query/spec';

import { DatasetColumnInterface } from '../entity/DatasetColumn';

export type DatasetRecommendation = SpecQuery & {
  key: string;
  value: string;
  dimension: DatasetColumnInterface;
  measure: DatasetColumnInterface;
};
