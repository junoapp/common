import { FacetedUnitSpec, TopLevel } from 'vega-lite/build/src/spec';

import { DatasetColumnInterface } from '../entity/DatasetColumn';
import { UserDatasetColumnInterface } from '../entity/UserDatasetColumn';
import { JunoMark } from './JunoMark';

export type DashboardRecommendation = {
  name: string;
  pages: DashboardRecommendationPage[];
};

export type DashboardRecommendationPage = {
  name: string;
  charts: DatasetRecommendation[];
};

export type DatasetRecommendation = Omit<TopLevel<FacetedUnitSpec>, 'mark'> & {
  id: string;
  key: string;
  mark: JunoMark;
  value: string;
  dimension: DatasetColumnInterface;
  measure: DatasetColumnInterface;
  secondDimension?: DatasetColumnInterface;
  trimValues: boolean;
  multipleLines?: DatasetRecommendationMultipleLines;
  geoFile?: string;
  userDimension?: UserDatasetColumnInterface;
  userMeasure?: UserDatasetColumnInterface;
  userSecondDimension?: UserDatasetColumnInterface;
};

export type DatasetRecommendationMultipleLines = {
  data: DatasetRecommendationMultipleLinesData[];
  specs: TopLevel<FacetedUnitSpec>[];
  axis: DatasetRecommendationMultipleLinesAxis;
};

export type DatasetRecommendationMultipleLinesData = {
  name: string;
  values: Record<string, number | undefined>;
};

export type DatasetRecommendationMultipleLinesAxis = Record<
  string,
  'left' | 'right'
>;
