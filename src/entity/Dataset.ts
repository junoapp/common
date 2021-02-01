import { BasicColumnsInterface } from './BasicColumns';
import { DatasetColumnInterface } from './DatasetColumn';
import { UserInterface } from './User';
import { UserDatasetInterface } from './UserDataset';

export interface DatasetInterface extends BasicColumnsInterface {
  id: number;
  type: DatasetType;
  columns: DatasetColumnInterface[];
  userDatasets: UserDatasetInterface[];
  addedBy: UserInterface;

  file?: DatasetFileInterface;
  database?: DatasetDatabaseInterface;
}

export enum DatasetType {
  File = 'FILE',
  Database = 'DATABASE',
}

export interface DatasetFileInterface {
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
}

export interface DatasetDatabaseInterface {
  id: number;
  type: DatasetDatabaseType;
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  schema: string;
  table: string;
}

export enum DatasetDatabaseType {
  PostgreSQL = 'POSTGRE_SQL',
}

export interface DatasetDatabaseTableInterface {
  tableName: string;
  columns: DatasetDatabaseTableColumnsInterface[];
}

export interface DatasetDatabaseTableColumnsInterface {
  name: string;
  dataType: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  foreignColumn?: DatasetDatabaseTableColumnsInterface;
}
