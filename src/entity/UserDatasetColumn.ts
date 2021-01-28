import { BasicColumnsInterface } from './BasicColumns';
import { DatasetColumnInterface, DatasetColumnRole } from './DatasetColumn';
import { UserDatasetInterface } from './UserDataset';

export interface UserDatasetColumnInterface extends BasicColumnsInterface {
  id: number;
  name: string;
  role: DatasetColumnRole;
  removed: boolean;
  index: number;
  userDataset: UserDatasetInterface;
  column: DatasetColumnInterface;
  aggregate?: DatasetSchemaAggregateFunction;
}

export enum DatasetSchemaAggregateFunction {
  None = 'NONE',
  Min = 'MIN',
  Mean = 'MEAN',
  Sum = 'SUM',
  Bin = 'BIN',
  Max = 'MAX',
  Median = 'MEDIAN',
}
