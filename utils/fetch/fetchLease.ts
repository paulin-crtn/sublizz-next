/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { ILease, ILeaseDetail, ISendReport } from "../../interfaces/lease";
import { ISendMessage } from "../../interfaces/lease";
import { ILeaseForm } from "../../components/edit-lease";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const getUserLeases = async (): Promise<ILeaseDetail[]> => {
  return await customFetch("leases/user", "GET");
};

export const storeLease = async (payload: ILeaseForm) => {
  return await customFetch("leases", "POST", payload);
};

export const updateLease = async (id: number, payload: ILeaseForm) => {
  return await customFetch(`leases/${id}`, "PUT", payload);
};

export const getUserMessages = async () => {
  return await customFetch("lease-messages/user", "GET");
};

export const storeLeaseMessage = async (payload: ISendMessage) => {
  return await customFetch("lease-messages", "POST", payload);
};

export const storeLeaseReport = async (payload: ISendReport) => {
  return await customFetch("lease-reports", "POST", payload);
};
