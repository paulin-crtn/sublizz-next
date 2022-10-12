/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import isAfter from "date-fns/isAfter";
import jwtDecode from "jwt-decode";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const customFetch = async (endPoint: string, method: string) => {
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
    return await _originalRequest(endPoint, method, jwt);
  }

  return Promise.reject("An error happened while using customFetch");
};

/* -------------------------------------------------------------------------- */
/*                              PRIVATE FUNCTIONS                             */
/* -------------------------------------------------------------------------- */
const _originalRequest = async (
  endPoint: string,
  method: string,
  jwt: string
) => {
  try {
    const response = await fetch("http://localhost:4000/" + endPoint, {
      method,
      headers: {
        Authorization: "Bearer " + jwt,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const _refreshToken = async () => {
  try {
    const response = await fetch("http://localhost:4000/auth/refresh", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("sublizz", data.access_token);
      return data.access_token;
    }
    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
};
