import { IUpdateUser } from "../interfaces/IUserUpdate";

const parseUserForm = (obj: IUpdateUser) => {
  const data = { ...obj } as any; // TS workaround
  for (const key in data) {
    if (data[key] === "") {
      data[key] = null;
    }
  }
  return data;
};

export default parseUserForm;
