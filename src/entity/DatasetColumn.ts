import { BasicColumnsInterface } from './BasicColumns';

export interface DatasetColumnInterface extends BasicColumnsInterface {
  id: number;
  name: string;
  title: string;
  description: string;
  index: number;
  originalIndex: number;
  role: DatasetColumnRole;
  type: DatasetColumnType;
  expandedType: DatasetColumnExpandedType;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  distinctValues: number;
  isCount: boolean;
}

export enum DatasetColumnRole {
  DIMENSION = 'dimension',
  MEASURE = 'measure',
}

export enum DatasetColumnType {
  STRING = 'string',
  NUMBER = 'number',
  INTEGER = 'integer',
  BOOLEAN = 'boolean',
  DATE = 'date',
}

export enum DatasetColumnExpandedType {
  QUANTITATIVE = 'quantitative',
  ORDINAL = 'ordinal',
  TEMPORAL = 'temporal',
  NOMINAL = 'nominal',
  GEO = 'geo',
  KEY = 'key',
}
