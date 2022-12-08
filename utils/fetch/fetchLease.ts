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
import { IBasicApiResponse } from "../../interfaces/IBasicApiResponse";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANT                                  */
/* -------------------------------------------------------------------------- */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const getLeases = async (options?: {
  city?: string;
  latitudes?: string;
  longitudes?: string;
  page?: string;
}): Promise<ILeasesWithCount> => {
  // Build URL with query params
  const queryParamsArr = [];
  if (options?.city) {
    queryParamsArr.push("city=" + options.city);
  }
  if (options?.latitudes) {
    queryParamsArr.push("latitudes=" + options.latitudes);
  }
  if (options?.longitudes) {
    queryParamsArr.push("longitudes=" + options.longitudes);
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
    cache: "no-store",
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

export const storeLease = async (
  payload: ILeaseForm
): Promise<ILeaseDetail> => {
  return await customFetch("leases", "POST", payload);
};

export const updateLease = async (
  id: number,
  payload: ILeaseForm
): Promise<ILeaseDetail> => {
  return await customFetch(`leases/${id}`, "PUT", payload);
};

export const deleteLease = async (id: number): Promise<IBasicApiResponse> => {
  return await customFetch(`leases/${id}`, "DELETE");
};

export const storeLeaseReport = async (
  payload: ILeaseReportForm
): Promise<IBasicApiResponse> => {
  return await customFetch("lease-reports", "POST", payload);
};
