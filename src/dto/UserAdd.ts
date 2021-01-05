import { UserDisability, UserVisLiteracy } from '../entity/User';

export interface UserDTO {
  name: string;
  disability?: UserDisability;
  visLiteracy: UserVisLiteracy;
}
