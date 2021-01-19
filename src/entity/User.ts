import { BasicColumnsInterface } from './BasicColumns';
import { DatasetInterface } from './Dataset';
import { UserDatasetInterface } from './UserDataset';

export interface UserInterface extends BasicColumnsInterface {
  id: number;
  name: string;
  disability?: UserDisability;
  visLiteracy: UserVisLiteracy;
  datasets: DatasetInterface[];
  userDatasets: UserDatasetInterface[];
}

export enum UserDisability {
  ColorBlind = 'COLOR_BLIND',
}

export enum UserVisLiteracy {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}
