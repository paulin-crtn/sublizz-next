import { UserRoleEnum } from "../enum/UserRoleEnum";
export interface IUser {
  id: number;
  role: UserRoleEnum;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  profilePictureName: string;
  standardMessage: string;
}
