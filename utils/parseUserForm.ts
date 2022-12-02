import { IUpdateUser } from "../interfaces/IUserUpdate";

/**
 * Replace empty strings by null
 *
 * @param obj
 * @returns
 */
const parseUserForm = (obj: IUpdateUser): IUpdateUser => {
  const data = { ...obj } as any; // TS workaround
  for (const key in data) {
    if (data[key] === "") {
      data[key] = null;
    }
  }
  return data;
};

export default parseUserForm;
