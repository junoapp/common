export interface UserInterface {
  id: number;
  name: string;
  disability?: UserDisability;
  visLiteracy: UserVisLiteracy;

  createdDate: Date;
  updatedDate: Date;
}

export enum UserDisability {
  COLOR_BLIND = 'COLOR_BLIND',
}

export enum UserVisLiteracy {
  low = 'LOW',
  medium = 'MEDIUM',
  high = 'HIGH',
}
