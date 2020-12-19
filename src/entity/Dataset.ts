import { DatasetColumnInterface } from './DatasetColumn';

export interface DatasetInterface {
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
}
