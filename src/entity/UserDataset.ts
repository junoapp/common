import { BasicColumnsInterface } from './BasicColumns';
import { DashboardInterface } from './Dashboard';
import { DatasetInterface } from './Dataset';
import { UserInterface } from './User';
import { UserDatasetColumnInterface } from './UserDatasetColumn';

export interface UserDatasetInterface extends BasicColumnsInterface {
  id: number;
  columns: UserDatasetColumnInterface[];
  dataset: DatasetInterface;
  owner: UserInterface;
  dashboard: DashboardInterface;
}
