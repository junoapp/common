import { UserInterface } from './User';

export interface UserPreferencesInterface {
  id: number;
  user: UserInterface;
  stacked: boolean;
  multiline: boolean;
  rightAxis: boolean;
  binValues: number;
  clampStrings: number;
  chartTypes: UserPreferencesChartTypeInterface[];
}

export interface UserPreferencesChartTypeInterface {
  id: number;
  typeX: PreferenceType;
  typeY: PreferenceType;
  chart: PreferenceType;
  userPreference: UserPreferencesInterface;
}

export enum PreferenceType {
  Number = 'NUMBER',
  String = 'STRING',
  Date = 'DATE',
}

export enum PreferenceType {
  Auto = 'AUTO',
  Line = 'LINE',
  Bar = 'BAR',
}
