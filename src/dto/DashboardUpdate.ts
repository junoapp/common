import { DashboardGoal, DashboardPurpose } from '../entity/Dashboard';
import { DatasetColumnRole } from '../entity/DatasetColumn';

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
}
