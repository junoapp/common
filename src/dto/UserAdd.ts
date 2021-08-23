import { UserVisLiteracy } from '../entity/User';

export interface UserDTO {
  name: string;
  disability?: string;
  visLiteracy: UserVisLiteracy;
}
