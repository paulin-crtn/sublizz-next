/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { IHelpUsForm } from "../../interfaces/IHelpUsForm";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const storeHelpUsMessage = async (payload: IHelpUsForm) => {
  return await customFetch("help-us", "POST", payload);
};
