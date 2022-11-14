/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { IHelpUsFom } from "../../interfaces/IHelpUsForm";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const storeHelpUsMessage = async (payload: IHelpUsFom) => {
  return await customFetch("help-us", "POST", payload);
};
