import { EncodingQuery } from 'compassql/build/src/query/encoding';

import { DatasetColumnInterface } from '../entity/DatasetColumn';

export type DatasetSpecEncoding = EncodingQuery & {
  column: DatasetColumnInterface;
  trimValues?: boolean;
};

export type DatasetSpecEncodings = [DatasetSpecEncoding, DatasetSpecEncoding];
