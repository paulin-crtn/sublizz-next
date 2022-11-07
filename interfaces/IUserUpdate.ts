import { UserRoleEnum } from "../enum/UserRoleEnum";

export interface IUpdateUser {
  role: UserRoleEnum;
  profilePictureName?: string | null;
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  standardMessage?: string;
  email?: string;
  password?: string;
}
