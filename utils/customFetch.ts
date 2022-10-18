/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import isAfter from "date-fns/isAfter";
import jwtDecode from "jwt-decode";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANT                                  */
/* -------------------------------------------------------------------------- */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const customFetch = async (
  endPoint: string,
  method: string,
  payload?: any
) => {
  let jwt = localStorage.getItem("sublizz");

  if (!jwt) {
    return;
  }

  const jwtDecoded: { sub: number; iat: number; exp: number } = jwtDecode(jwt);
  const isExpired = isAfter(Date.now(), jwtDecoded.exp * 1000);

  if (isExpired) {
    jwt = await _refreshToken();
  }

  if (jwt) {
    return await _originalRequest(endPoint, method, payload);
  }

  throw new Error("An error happened while using customFetch");
};

/* -------------------------------------------------------------------------- */
/*                              PRIVATE FUNCTIONS                             */
/* -------------------------------------------------------------------------- */
const _originalRequest = async (
  endPoint: string,
  method: string,
  payload?: any
) => {
  const jwt = localStorage.getItem("sublizz");
  const response = await fetch(`${API_URL}/${endPoint}`, {
    method,
    headers: {
      Authorization: "Bearer " + jwt,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...(payload && { body: JSON.stringify(payload) }),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message);
};

export const _refreshToken = async () => {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("sublizz", data.access_token);
    return data.access_token;
  }
  throw new Error(data.message);
};