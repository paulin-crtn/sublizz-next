/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { IUpdateUser } from "../interfaces/IUpdateUser";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const updateUser = async (userId: number, payload: IUpdateUser) => {
  return await customFetch(`users/${userId}`, "PUT", payload);
};
