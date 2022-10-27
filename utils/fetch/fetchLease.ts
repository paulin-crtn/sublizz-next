/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { ILeaseDetail, ISendReport } from "../../interfaces/lease";
import { ISendMessage } from "../../interfaces/lease";
import { ILeaseForm } from "../../components/edit-lease";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANT                                  */
/* -------------------------------------------------------------------------- */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const getLease = async (id: any): Promise<ILeaseDetail> => {
  const response = await fetch(`${API_URL}/leases/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message);
};

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
