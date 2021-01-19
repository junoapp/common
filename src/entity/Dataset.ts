import { BasicColumnsInterface } from './BasicColumns';
import { DatasetColumnInterface } from './DatasetColumn';
import { UserInterface } from './User';
import { UserDatasetInterface } from './UserDataset';

export interface DatasetInterface extends BasicColumnsInterface {
  id: number;
  path: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  tableName: string;
  columns: DatasetColumnInterface[];
  userDatasets: UserDatasetInterface[];
  addedBy: UserInterface;
}
