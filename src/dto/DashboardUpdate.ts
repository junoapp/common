import { DashboardGoal, DashboardPurpose } from '../entity/Dashboard';
import { DatasetColumnRole } from '../entity/DatasetColumn';
import { DatasetSchemaAggregateFunction } from '../entity/UserDatasetColumn';

export interface DashboardInsert {
  datasetId: number;
  name: string;
  user: number;
  goal: DashboardGoal;
  purpose: DashboardPurpose;
  colums: DashboardUpdateColumn[];
}

export interface DashboardUpdate {
  id: number;
  name: string;
  user: number;
  goal: DashboardGoal;
  purpose: DashboardPurpose;
  colums: DashboardUpdateColumn[];
}

export interface DashboardUpdateColumn {
  id: number;
  name: string;
  index: number;
  role?: DatasetColumnRole;
  removed: boolean;
  aggregate?: DatasetSchemaAggregateFunction;
}
