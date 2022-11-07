import { UserRoleEnum } from "../enum/UserRoleEnum";

export default interface ISignup {
  role: UserRoleEnum;
  firstName: string;
  email: string;
  password: string;
  consent: boolean;
}
