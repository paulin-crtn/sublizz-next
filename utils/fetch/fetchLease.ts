/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import {
  ILeaseDetail,
  ILeaseForm,
  ILeaseReportForm,
  ILeasesWithCount,
} from "../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANT                                  */
/* -------------------------------------------------------------------------- */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const getLeases = async (options?: {
  city?: string;
  lat?: string;
  lng?: string;
  page?: string;
}): Promise<ILeasesWithCount> => {
  // Build URL with query params
  const queryParamsArr = [];
  if (options?.city) {
    queryParamsArr.push("city=" + options.city);
  }
  if (options?.lat) {
    queryParamsArr.push("lat=" + options.lat);
  }
  if (options?.lng) {
    queryParamsArr.push("lng=" + options.lng);
  }
  if (options?.page) {
    queryParamsArr.push("page=" + options.page);
  }
  const queryParams = queryParamsArr.join("&");
  const url = !!queryParams.length
    ? `${API_URL}/leases/?${queryParams}`
    : `${API_URL}/leases`;
  // Fetch
  const response = await fetch(url, {
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

export const deleteLease = async (id: number) => {
  return await customFetch(`leases/${id}`, "DELETE");
};

export const storeLeaseReport = async (payload: ILeaseReportForm) => {
  return await customFetch("lease-reports", "POST", payload);
};
