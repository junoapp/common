import { BasicColumnsInterface } from './BasicColumns';
import { DatasetInterface } from './Dataset';
import { UserDatasetInterface } from './UserDataset';
import { UserPreferencesInterface } from './UserPreferences';

export interface UserInterface extends BasicColumnsInterface {
  id: number;
  name: string;
  disability?: string;
  visLiteracy: UserVisLiteracy;
  datasets: DatasetInterface[];
  userDatasets: UserDatasetInterface[];
  preferences: UserPreferencesInterface;
}

export enum UserDisability {
  ColorBlind = 'COLOR_BLIND',
}

export enum UserVisLiteracy {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}
