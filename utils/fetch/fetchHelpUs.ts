/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { IHelpUsForm } from "../../interfaces/IHelpUsForm";
import { IBasicApiResponse } from "../../interfaces/IBasicApiResponse";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const storeHelpUsMessage = async (
  payload: IHelpUsForm
): Promise<IBasicApiResponse> => {
  return await customFetch("help-us", "POST", payload);
};
