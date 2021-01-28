import {
  DatasetRecommendationMultipleLinesAxis,
  DatasetRecommendationMultipleLinesData,
} from './DatasetRecommendation';
import { JunoMark } from './JunoMark';

export interface DatasetChartSpec {
  page: string;
  type: JunoMark;
  name: string;
  values: DatasetChartSpecValues[] | DatasetRecommendationMultipleLinesData[];
  axis?: DatasetRecommendationMultipleLinesAxis;
}

export interface DatasetChartSpecValues {
  name: string;
  name2?: string;
  value: number;
  value2?: number;
}
